import React, { useState } from "react";
import { LOGIN_PATH, SERVER_LOCATION } from "../Constants/Server";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const context = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Заполните все поля");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      const res = await fetch(SERVER_LOCATION + LOGIN_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({
          login: username,
          password: password,
          repeatPassword: password,
        }),
      });

      const { data } = await res.json();

      if (data.message === "Success!") {
        setIsLoggedIn(true);
        console.log({ role: data.role });
        if (data.role === "admin") {
          navigate("/admin");
        }
        // sessionStorage.setItem(
        //   "user",
        //   JSON.stringify({ token: data.acessToken, username: data.login })
        // );

        context.login(data.login, data.acessToken);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <section className="logged-in">
          <h2>Добро пожаловать, {username}!</h2>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              context.logout();
              // sessionStorage.removeItem("user");
            }}
          >
            Выйти
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Авторизация</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Входим..." : "Войти"}
        </button>
      </form>
      <section className="under-form">
        <p className="under-form-text">Нет аккаунта? </p>
        <Link className="under-form-link" to="/signup">
          Зарегистрироваться
        </Link>
      </section>
    </div>
  );
};

export default Login;
