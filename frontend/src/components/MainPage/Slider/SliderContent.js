import { Link } from "react-router-dom";

function SliderContent({ activeIndex, sliderImage }) {
  return (
    <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slide.urls} alt="" />
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <h3 className="slide-text">{slide.description}</h3>
            {slide.button && (
              <Link
                to={slide.button.link}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  opacity: 0,
                  transition: "all 0.3s ease",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = "0";
                }}
              >
                Перейти в магазин
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
