import React, { useState, useMemo, useEffect } from "react";
import CardProduct from "./CardProduct";
import { SERVER_LOCATION } from "../Constants/Server";
import "../../assets/styles/ProductSearch.css";

// Вспомогательная функция для получения плоского списка всех товаров
const getAllProducts = (productsData) => {
  return Object.values(productsData).flat();
};

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const allProducts = useMemo(() => getAllProducts(products), [products]);

  useEffect(() => {
    fetch("http://localhost:8080/products", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Данные продуктов:", data.data.Products);
        setProducts(data.data.Products);
      });
  }, []);

  // Фильтруем товары на основе поискового запроса
  // useMemo кэширует результат, пока searchTerm или allProducts не изменятся
  const filteredProducts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearchTerm) {
      return []; // Не показываем ничего, если поиск пуст
      // или return allProducts; // если нужно показывать все товары при пустом поиске
    }
    return allProducts.filter((product) =>
      product.Название.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, allProducts]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h2>Поиск по товарам</h2>
      <input
        type="text"
        placeholder="Введите название товара..."
        value={searchTerm}
        onChange={handleInputChange}
        className="input-productSearch"
      />

      {/* Показываем результаты только если есть ввод */}
      {searchTerm && (
        <div className="resultsContainer">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <CardProduct
                id={product.id}
                productInfo={product}
                price={product.Цена}
                productSubcategory={"категория"}
                productIndex={index}
                title={product.Название}
                productSRC={SERVER_LOCATION + product.Изображение}
              />
            ))
          ) : (
            <p className="noResults">Ничего не найдено.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
