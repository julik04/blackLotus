import "../../App.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_content">
          <h5 className="black_lotus">
            Тату студия - <br /> Black Lotus
          </h5>

          <div className="content_left">
            <p className="left_p">Телефон Tg/Whapp Адрес Метро</p>
            <p className="right_p">
              <a className="telefon" href="tel:+7(888)777-75-55">
                +7 (888) 777-75-55
              </a>
              <br />
              <a className="telefon" href="tel:+7(921)951-22-24">
                +7 (921) 951-22-24
              </a>
              <br />
              ул. 2-я Советская, 12
              <br />
              Площадь Восстания
            </p>
          </div>
        </div>
        <small className="copyright">COPYRIGHT 2025 © ВСЕ ПРАВА ЗАЩИЩЕНЫ</small>
        <br />
        <Link to="/sitemap/graphic">
          Графическая карта сайта{" / "}
          <Link to="/sitemap/text">Текстовая карта сайта</Link>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
