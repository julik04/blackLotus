import "../../App.css";
import apparat from "../../assets/apparat.png";

function Prof() {
  return (
    <div className="skills">
      <div className="container">
        {/* <img
          className="skills_instr"
          src={apparat}
          alt="apparat"
          style={{
            width: "100vw",
            objectFit: "cover",
          }}
        ></img> */}
        <div className="skills_skills">
          <h3 className="skills_small">Навыки мастеров</h3>
          <h2 className="skills_big">Качество - это практика</h2>
          <div className="skills_to_be">
            Чтобы быть гуру в таком ремесле, где тесно сочетаются творческий
            процесс и медицинская процедура, необходимо сохранять «свежий»
            взгляд и одновременно постоянно совершенствуя свои навыки.
            <br />
            Залог успеха – это постоянная практика, творческие вызовы и компания
            единомышленников.
          </div>
          <div className="skills_panels">
            <div className="skills_panel">
              <h3 className="skills_nums">12</h3>
              <p className="skills_text">Мастеров</p>
            </div>
            <div className="skills_panel">
              <h3 className="skills_nums">{">"}4000</h3>
              <p className="skills_text">Татуировок</p>
            </div>
            <div className="skills_panel">
              <h3 className="skills_nums">{">"}9000</h3>
              <p className="skills_text">Проколов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prof;
