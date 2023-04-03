import "./App.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";
import { Report } from "./components/Report/Report";
import { AllOfficers } from "./components/AllOfficers/AllOfficers";
import { Messages } from "./components/Messages/Messages";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(
      localStorage.getItem(localStorage.getItem("admin") || false)
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
        .post(
            "https://sf-final-project-be.herokuapp.com/api/auth/sign_in",
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
        )

        .then((response) => {
          setLoading(false);
          setData(response.data);
          localStorage.setItem("token", response.data.data.token);

            if (response.data.data.token) {
                setAdmin(!admin);
                localStorage.setItem("admin", true);
                setTimeout(() => {
                    window.location.replace("/");
                }, 2000);
            }
          setMessage("Вы авторизованы");
        })
        .catch((error) => {
          setMessage("Вы ввели неверный логин или пароль");
        });
  };

  return (
      <div className="App">
        <Router>
          <Header admin={admin} setAdmin={setAdmin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="auth/sign_up" element={<Signup />}></Route>
            <Route
                path="auth/sign_in"
                element={
                  <Signin
                      admin={admin}
                      setAdmin={setAdmin}
                      data={data}
                      setData={setData}
                      password={password}
                      setPassword={setPassword}
                      setEmail={setEmail}
                      message={message}
                      email={email}
                      handleSubmit={handleSubmit}
                      loading={loading}
                  />
                }
            ></Route>
            <Route
                path="public/report"
                element={<Report admin={admin} />}
            ></Route>
            <Route
                path="/officers"
                element={
                  <AllOfficers approved={approved} setApproved={setApproved} />
                }
            ></Route>
            <Route
                path="/cases/"
                element={<Messages approved={approved} setApproved={setApproved} />}
            ></Route>
            <Route
                path="/officers/:id"
                element={
                  <AllOfficers approved={approved} setApproved={setApproved} />
                }
            ></Route>
            <Route
                path="/cases/:id"
                element={<Messages approved={approved} setApproved={setApproved} />}
            ></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
