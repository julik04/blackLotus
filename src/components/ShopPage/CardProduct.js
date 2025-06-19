import { useNavigate } from "react-router-dom";
import { SERVER_LOCATION } from "../Constants/Server";

function CardProduct({
  id, // Добавляем пропс id
  title,
  price,
  productSRC,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        // Используем id товара для навигации
        navigate(`/product/${id}`);
      }}
    >
      <img src={productSRC} alt={title} />
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="price">{price}₽ </p>
      </div>
    </div>
  );
}

export default CardProduct;
