import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_LOCATION, ORDERS } from "../../Constants/Server";
import "../../../assets/styles/Orders.css";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    order_date: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [editingOrderId, setEditingOrderId] = useState(null);
  const getAuthHeader = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(SERVER_LOCATION + ORDERS, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data.Orders || []);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_id) {
      newErrors.user_id = "Требуется id пользователя";
    }

    if (!formData.order_date) {
      newErrors.order_date = "Требуется дата заявки";
    } else if (new Date(formData.order_date) < new Date()) {
      newErrors.order_date = "Дата заявки не может быть в прошлом";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let url, method;
      if (editingOrderId) {
        url = SERVER_LOCATION + ORDERS + "/edit";
        method = "POST";
      } else {
        url = SERVER_LOCATION + ORDERS;
        method = "POST";
      }

      const payload = editingOrderId
        ? { ...formData, id: editingOrderId }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.data?.message ||
            (editingOrderId
              ? "Не получилось обновить заявку"
              : "Не получилось создать заявку")
        );
      }

      setMessage(
        editingOrderId ? "Заявка успешно обновлена!" : "Заявка успешно создана!"
      );

      setFormData({ user_id: "", order_date: "", comment: "" });
      setEditingOrderId(null);
      fetchOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEditClick = (order) => {
    setFormData({
      user_id: order.user_id,
      order_date: formatDateTimeLocal(order.order_date),
      comment: order.comment || "",
    });
    setEditingOrderId(order.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setFormData({ user_id: "", order_date: "", comment: "" });
    setEditingOrderId(null);
    setMessage("");
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Вы точно хотите удалить заявку?")) return;

    try {
      const response = await fetch(`${SERVER_LOCATION}${ORDERS}/${orderId}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.data?.message || "Не получилось удалить заявку");
      }

      setMessage("Заявка успешно удалена!");
      setEditingOrderId(null);
      fetchOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="product-manager">
      <>
        <button className="back-button" onClick={() => navigate("/admin")}>
          ← Назад
        </button>
        <h1>Управление заявками</h1>

        {/* Create/Edit Order Form */}
        <div className="product-form">
          <h2>
            {editingOrderId ? "Редактировать заявку" : "Создать новую заявку"}
          </h2>
          {message && (
            <div
              className={`status ${
                message.includes("успешно") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <label>ID пользователя:</label>
              <input
                type="number"
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                disabled={!!editingOrderId}
                className={errors.user_id ? "error" : ""}
              />
              {errors.user_id && (
                <span className="error-message">{errors.user_id}</span>
              )}
            </div>

            <div className="form-group">
              <label>Дата записи:</label>
              <input
                type="datetime-local"
                name="order_date"
                value={formData.order_date}
                onChange={handleInputChange}
                className={errors.order_date ? "error" : ""}
              />
              {errors.order_date && (
                <span className="error-message">{errors.order_date}</span>
              )}
            </div>

            <div className="form-group">
              <label>Комментарий (необязательно):</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingOrderId ? "Обновить заявку" : "Создать заявку"}
              </button>
              {editingOrderId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                >
                  Отменить редактирование
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Orders List */}
        <div className="product-list">
          <h2>Существующие заявки</h2>
          {orders.length === 0 ? (
            <p>Заявки не найдены</p>
          ) : (
            <div className="products-container">
              {orders.map((order) => (
                <div key={order.id} className="product-card">
                  <div className="product-details">
                    <h4>ID заявки: {order.id}</h4>
                    <p>ID пользователя: {order.user_id}</p>
                    <p>
                      Дата записи: {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p>
                      Created At: {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p>
                      Updated At: {new Date(order.updated_at).toLocaleString()}
                    </p>
                    {order.comment && <p>Комментарий: {order.comment}</p>}

                    <div className="product-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(order)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
};
