import "../../App.css";
import home_shop01 from "../../assets/home_shop01.svg";
import home_shop02 from "../../assets/home_shop02.svg";
import home_shop03 from "../../assets/home_shop03.svg";

function Cont() {
  return (
    <div className="about_section">
      <div className="container">
        <div className="about_text">
          <h2 className="heading_about">Студия Black Lotus Tattoo</h2>
          <p className="text_about">
            Наша тату студия является креативной площадкой, где в центре
            внимания удивительные способы персональной самоидентификации
            становятся объектами искусства. Художественные татуировки и все виды
            пирсинга.
            <br />
            «Black Lotus Tattoo» – это тату салон, где авангардная культура
            изменения тела объединяется с высоким сервисом обслуживания и
            вниманием к клиенту.
            <br />
            Две уютные студии в центре Петербурга с отдельными кабинетами, где
            топ-мастера помогут воплотить любые фантазии о вашем визуальном
            образе.
            <br />
            Мы уделяем огромное внимание соблюдению чистоты в студии, используем
            только одноразовые расходные материалы и профессиональное
            дорогостоящее оборудование.
            <br />
            Ждем Вас ежедневно с 12 до 21!
          </p>
          <div className="images">
            <div className="images_panels">
              <div className="images_panel">
                <img
                  className="images_image"
                  src={home_shop01}
                  alt="home_shop01"
                  style={{
                    height: 178,
                  }}
                ></img>
                <h3 className="images_heading">Творчество</h3>
                <p className="image_text">
                  Бесплатная разработка эскизов.
                  <br />
                  Бесплатные консультации.
                </p>
              </div>
              <div className="images_panel">
                <img
                  className="images_image"
                  src={home_shop02}
                  alt="home_shop02"
                  style={{
                    height: 178,
                  }}
                ></img>
                <h3 className="images_heading">Приватность</h3>
                <p className="image_text">
                  Уютные отдельные кабинеты.
                  <br />
                  Наедине с мастером.
                </p>
              </div>
              <div className="images_panel">
                <img
                  className="images_image"
                  src={home_shop03}
                  alt="home_shop03"
                  style={{
                    height: 178,
                  }}
                ></img>
                <h3 className="images_heading">Стерильность</h3>
                <p className="image_text">
                  Специальная уборка помещений.
                  <br />
                  Строгий контроль чистоты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cont;
