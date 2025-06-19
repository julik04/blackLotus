import { Link } from "react-router-dom";
import "../assets/styles/TextSitemap.css";

function TextSitemap() {
  return (
    <div className="sitemap-container">
      <ul className="sitemap-list">
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <ul>
            <li>
              <Link to="/studio#about">О нас</Link>
            </li>
            <li>
              <Link to="/masters">Мастера</Link>
            </li>
            <li>
              <Link to="/reviews">Отзывы</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/shopMain">Магазин</Link>
        </li>
        <li>
          <Link to="/login">Авторизация</Link>
        </li>
      </ul>
    </div>
  );
}
export default TextSitemap;
