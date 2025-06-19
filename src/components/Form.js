import React, { useState } from "react";
import { SERVER_LOCATION, ORDERS } from "./Constants/Server";

const OrderForm = ({ active, setActive, onOrderCreated }) => {
  const [formData, setFormData] = useState({
    order_date: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const getUserData = () => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    return userData || {};
  };

  const validateField = (name, value) => {
    switch (name) {
      case "order_date":
        if (!value.trim()) return "Дата обязательная для заполнения";
        const selectedDate = new Date(value);
        if (selectedDate < new Date())
          return "Дата записи не может быть в прошлом";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);

    // Validate fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = getUserData();
      if (!userData.id) {
        throw new Error(
          "Сессия пользователя истекла. Войдите снова, чтобы продолжить."
        );
      }

      const response = await fetch(`${SERVER_LOCATION}${ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.id,
          order_date: formData.order_date,
          comment: formData.comment,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.data?.message || "Ошибка при создании заказа");
      }

      setServerMessage({
        type: "success",
        text: "Заказ успешно создан!",
      });

      setFormData({
        order_date: "",
        comment: "",
      });

      if (onOrderCreated) {
        onOrderCreated(result.data.Order);
      }

      setTimeout(() => setActive(false), 1500);
    } catch (err) {
      setServerMessage({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!active) return null;

  return (
    <div className={`form ${active ? "active" : ""}`}>
      <div className={`form_content ${active ? "active" : ""}`}>
        <button className="form_close" onClick={() => setActive(false)}>
          ×
        </button>
        <h2 className="title">Записаться на прием</h2>

        {serverMessage && (
          <div className={`server-message ${serverMessage.type}`}>
            {serverMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="datetime-local"
              name="order_date"
              className={`input ${errors.order_date ? "input-error" : ""}`}
              value={formData.order_date}
              onChange={handleChange}
            />
            <span className="placeholder">Дата и время записи</span>
            {errors.order_date && (
              <span className="error-message">{errors.order_date}</span>
            )}
          </div>

          <div className="input-container">
            <textarea
              name="comment"
              className="input"
              placeholder=" "
              value={formData.comment}
              onChange={handleChange}
              rows="3"
            />
            <span className="placeholder">Комментарий (необязательно)</span>
          </div>

          <button
            type="submit"
            className={`submit ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Создание заявки..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
