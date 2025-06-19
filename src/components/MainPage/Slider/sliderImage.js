import First from "../../../assets/tattoist-slider.webp";
import Second from "../../../assets/shop-slider.jpg";
import Third from "../../../assets/man-slider.jpg";

export default [
  {
    title: "Студия тату",
    description: "аттракцион боли - карнавал индивидуальности",
    urls: First,
  },

  {
    title: "Эксклюзивный магазин BLT Store",
    description: "товары для тату",
    urls: Second,
    button: {
      text: "Перейти в магазин",
      link: "/shopMain",
      style: {
        backgroundColor: "#C9ADA7",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textDecoration: "none",
        display: "inline-block",
        marginTop: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#9A8C98",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        },
      },
    },
  },

  {
    title: "Подарочные сертификаты",
    description: "сделай незабываемый подарок близкому человеку",
    urls: Third,
  },
];
