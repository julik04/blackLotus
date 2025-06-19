import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Products } from "../Constants/Products";
import "../../assets/styles/ProductPageTemplate.css";
import { SERVER_LOCATION } from "../Constants/Server";

function ProductPageTemplate() {
  const navigate = useNavigate();
  const { productInfo } = useParams();
  const [isProductVerified, setIsProductVerified] = useState(true);
  // const productObj = Products[productSubcategory][productIndex];

  const productObj = JSON.parse(productInfo.replace(/\*/g, "/"));

  console.log("productObj[Изображение]", productObj["Изображение"]);

  useEffect(() => {
    const allProducts = fetch("http://localhost:8080/products", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const allProductsArray = [];
        console.log({ products: data.data.Products });
        Object.values(data.data.Products).forEach((arr) =>
          allProductsArray.push(...arr)
        );
        // return allProductsArray;

        setIsProductVerified(
          allProductsArray.some((value) => {
            return (
              value["Название"] === productObj["Название"] &&
              value["Цена"] === productObj["Цена"] &&
              value["Изображение"] === productObj["Изображение"]
            );
          })
        );
      });

    console.log("allProducts", allProducts);
  }, []);

  return (
    <div className="product-page">
      {isProductVerified ? (
        <>
          <div className="product-container">
            <button
              className="back-button"
              onClick={() => navigate("/shopMain")}
            >
              ← Назад в каталог
            </button>

            <div className="product-content">
              <div className="product-image-container">
                <img
                  src={SERVER_LOCATION + productObj["Изображение"]}
                  alt={productObj["Название"]}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <h1 className="product-title">{productObj["Название"]}</h1>
                <div className="product-price">{productObj["Цена"]} ₽</div>
                <div className="product-category">
                  {productObj["Категория"]}
                </div>

                <div className="product-description">
                  <h2>Описание товара</h2>
                  <p>
                    {productObj["Описание"] || "Описание товара отсутствует"}
                  </p>
                </div>

                <button className="buy-button">Купить</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-container">
          <h2>Товар не найден</h2>
          <p>Извините, но запрашиваемый товар не существует.</p>
          <button className="back-button" onClick={() => navigate("/shopMain")}>
            Вернуться в каталог
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductPageTemplate;
