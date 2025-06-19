import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const UserIcon = ({ setModalActive }) => {
  const [initials, setInitials] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#4e73df");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData && userData.username) {
      // Set username and full name
      setUsername(userData.username);
      setFullName(userData.full_name || userData.username); // Fallback to username if full_name not available

      // Generate initials
      const cleanName = (userData.full_name || userData.username)
        .trim()
        .replace(/\s+/g, " ");
      const nameParts = cleanName.split(" ");

      let initials = "";
      if (nameParts.length === 0) {
        initials = "?";
      } else if (nameParts.length === 1) {
        initials = nameParts[0].slice(0, 2).toUpperCase();
      } else {
        initials = (
          nameParts[0][0] + nameParts[nameParts.length - 1][0]
        ).toUpperCase();
      }

      setInitials(initials);

      // Generate background color based on user ID
      if (userData.id) {
        const colors = [
          "#C9ADA7",
          "#9A8C98",
          "#4A4E69",
          "#22223B",
          "#cbc0d3",
          "#ffcad4",
          "#5C5470",
          "#352F44",
        ];
        setBackgroundColor(colors[userData.id % colors.length]);
      }
    }

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.reload(); // Or redirect to login page
  };

  if (!username) return null;

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <div
        className="user-icon"
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          userSelect: "none",
        }}
        onClick={() => setShowMenu(!showMenu)}
        title={`Logged in as ${username}`}
      >
        {initials}
      </div>

      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            minWidth: 250,
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                color: "#6c757d",
                marginBottom: 4,
              }}
            >
              Вы зарегистрированы как:
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "var(--text-black)",
              }}
            >
              {fullName}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#6c757d",
                marginTop: 4,
              }}
            >
              Логин: {username}
            </div>
          </div>

          <div style={{ padding: "0.5rem" }}>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4e73df",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderTop: "1px solid #eee",
              }}
              onClick={() => navigate("/user/orders")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2 2h12v2H2V2zm0 3h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm2 2v7h8V7H4z" />
              </svg>
              Мои заказы
            </button>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#dc3545",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
              Выйти
            </button>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4e73df",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderTop: "1px solid #eee",
              }}
              onClick={() => setModalActive(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Записаться
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
