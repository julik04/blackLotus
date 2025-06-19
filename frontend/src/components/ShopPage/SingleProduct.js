import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SERVER_LOCATION } from "../Constants/Server";
import "../../assets/styles/ProductPageTemplate.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(SERVER_LOCATION + `/product/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error("Failed to fetch product");
        }

        const result = await response.json();
        setProduct(result.data.Product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-container">
          <div>Загрузка деталей товаров...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <div className="error-container">
          <h2>Ошибка!</h2>
          <p>{error}</p>
          <button className="buy-button" onClick={() => navigate("/shopMain")}>
            ← Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <div className="error-container">
          <h2>Товар недоступен</h2>
          <button className="buy-button" onClick={() => navigate("/shopMain")}>
            ← Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Вернуться в каталог
        </button>

        <div className="product-content">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-price">
              <span>{product.price}₽</span>
            </div>

            <div className="product-description">
              <h2>Описание товара</h2>
              <p>{product.description || "Описание отсутствует"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
