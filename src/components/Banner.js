import React from "react";
import "./Banner.css";
import tattooPiercing from "../assets/tattoo-piercing.png"; // путь к вашему изображению
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-container">
      <div className="banner-circle-1"></div>
      <div className="banner-circle-2"></div>
      <div className="banner-content">
        <h1 className="banner-title">ЗАГЛЯНИТЕ В КАТАЛОГ НАШЕГО МАГАЗИНА</h1>
        <p className="banner-description">
          В нашем каталоге представлен большой выбор товаров от нашей тату
          студии.
        </p>
        <button className="banner-button" onClick={() => navigate("/shopMain")}>
          ПЕРЕЙТИ
        </button>
        <div className="banner-discount">
          <div className="discount-circle">
            <span className="discount-percent">20%</span>
            <span className="discount-text">скидка на первый заказ</span>
          </div>
        </div>
      </div>
      <div className="banner-images">
        <img className="banner-image" src={tattooPiercing} alt="Пирсинг" />
      </div>
    </div>
  );
};

export default Banner;
