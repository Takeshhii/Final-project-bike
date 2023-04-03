import React from "react";
import home from "./home.svg";
import "./home.css";

export const Home = () => {
  return (
    <div className="home">
      <img className="ride" src={home} alt="bike" width="55%" height="50%" />
      <div className="blob">
        <div>
          <span>
            У вас украли велосипед?<br />
            Не переживайте, мы вам поможем !
          </span>
        </div>
        <div>
          <span>
            Осмотрите место угона на наличие каких либо улик.
          </span>
        </div>
        <div>
          <span>
            Сообщите нам все данные на нашем удобном сайте.
          </span>
        </div>
      </div>
    </div>
  );
};
