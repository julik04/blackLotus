import { Link } from "react-router-dom";
import "../assets/styles/GraphicSitemap.css";

function GraphicSitemap() {
  const pages = [
    { name: "Главная", path: "/", x: 350, y: 50 },
    { name: "Студия", path: "/studio", x: 150, y: 200 },
    { name: "Мастера", path: "/masters", x: 350, y: 200 },
    { name: "Магазин", path: "/shopMain", x: 550, y: 200 },
    { name: "FAQ", path: "/faq", x: 150, y: 350 },
    { name: "Отзывы", path: "/reviews", x: 350, y: 350 },
    { name: "Авторизация", path: "/login", x: 550, y: 350 },
  ];

  return (
    <div className="graphic-sitemap">
      <svg width="800" height="500" viewBox="0 0 800 500">
        {pages.slice(1).map((page, index) => (
          <line
            key={`line-${index}`}
            x1={400}
            y1={110}
            x2={page.x + 50}
            y2={page.y}
            stroke="#5C5470"
            strokeWidth="2"
          />
        ))}
        {pages.map((page, index) => (
          <g key={index}>
            <rect
              x={page.x}
              y={page.y}
              width="100"
              height="60"
              fill="#5C5470"
            />
            <text
              x={page.x + 50}
              y={page.y + 30}
              textAnchor="middle"
              fill="white"
              dominantBaseline="middle"
            >
              {page.name}
            </text>
            <Link to={page.path}>
              <rect
                x={page.x}
                y={page.y}
                width="100"
                height="60"
                fill="transparent"
              />
            </Link>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default GraphicSitemap;
