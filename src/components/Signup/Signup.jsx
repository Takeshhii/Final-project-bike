import React from "react";
import { useState } from "react";
import "../Report/report.css";
import "./signup.css";
import axios from "axios";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "4ed98d48-11ce-4eb8-bfad-238a8ce81a6d") {
      setMessage("Введите верный Client Id ");
    }
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
        { email, password, firstName, lastName, clientId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setClientId("");
          setMessage("Поздравлем, вы успешно зарегистрированы!");
          console.log(response);
        },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setFirstName(e.target.value);
  };
  const changeSurname = (e) => {
    setLastName(e.target.value);
  };
  const changeId = (e) => {
    setClientId(e.target.value);
  };

  return (
    <div className="report">
      <div className="signup">
      </div>
      <form className="formPublic" method="post" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <label>
          E-mail* <br />
          <input
            onChange={changeMail}
            type="text"
            name="email"
            value={email}
            required
          />
        </label>
        <label>
          Пароль* <br />
          <input
            onChange={changePassword}
            type="password"
            name="пароль"
            value={password}
            required
          />
        </label>
        <label>
          Имя <br />{" "}
          <input
            onChange={changeName}
            type="text"
            name="имя"
            value={firstName}
          />
        </label>
        <label>
          Фамилия <br />
          <input
            onChange={changeSurname}
            type="text"
            name="фамилия"
            value={lastName}
          />
        </label>
        <label>
          Client ID* <br />{" "}
          <input
            onChange={changeId}
            type="text"
            name="client id"
            value={clientId}
            required
          />
        </label>
        <button style={{ width: "200px", marginTop: "15px" }}>
          Зарегистрироваться
        </button>
        <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
      </form>
    </div>
  );
};
