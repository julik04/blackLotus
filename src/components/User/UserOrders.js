import React, { useState, useEffect } from "react";
import { SERVER_LOCATION, ORDERS } from "../Constants/Server";
import "../../assets/styles/UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData && userData.id) {
      setUserId(userData.id);
    } else {
      setError("User not found in session storage");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${SERVER_LOCATION}${ORDERS}/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
        const result = await response.json();
        setOrders(result.data.Orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div className="orders-loading">Загрузка заявок...</div>;
  }

  if (error) {
    return <div className="orders-error">Ошибка: {error}</div>;
  }

  return (
    <section className="orders-section">
      <div className="orders-container">
        <h1 className="orders-title">Мои заявки</h1>

        {orders.length === 0 ? (
          <p className="orders-empty">У вас пока нет заявок</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3 className="order-date">
                    {new Date(order.order_date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <span className="order-status">Запланировано</span>
                </div>

                <div className="order-body">
                  <p className="order-comment">
                    {order.comment || "Без комментария"}
                  </p>
                  <div className="order-meta">
                    <span className="order-created">
                      Создано: {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UserOrders;
