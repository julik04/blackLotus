import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function AdminPanel() {
  const navigate = useNavigate();
  return (
    <>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Назад
      </button>
      <div className="admin-panel">
        <h1>Админ панель</h1>
        <div className="admin-links">
          <Link to="/admin/orders" className="admin-link">
            Управление заявками
          </Link>
          <Link to="/admin/products" className="admin-link">
            Управление товарами
          </Link>
        </div>
      </div>
    </>
  );
}
