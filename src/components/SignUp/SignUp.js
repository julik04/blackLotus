import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SERVER_LOCATION, SIGN_UP } from "../Constants/Server";

const SignUp = () => {
  // Form state
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
    full_name: "",
    phone_number: "",
    birth_date: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "").substring(0, 11);
    // Format based on digit count
    if (digits.length === 0) return "";
    if (digits.length <= 1) return digits;
    if (digits.length <= 4) return `${digits[0]} (${digits.substring(1)}`;
    if (digits.length <= 7) {
      return `${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4)}`;
    }
    return `${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(
      4,
      7
    )}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Apply phone number formatting
    if (name === "phone_number") {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear field error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const phoneDigitsCount = formData.phone_number.replace(/\D/g, "").length;

  const validate = () => {
    const newErrors = {};

    // Login validation
    if (!formData.login) {
      newErrors.login = "Требуется логин";
    } else if (!/^(?=.*\d)[a-zA-Z0-9]{4,14}$/.test(formData.login)) {
      newErrors.login =
        "Логин должен содержать 7-14 латинских букв и минимум 1 цифру";
    } else if (formData.login.length <= 6 || formData.login.length >= 255) {
      newErrors.login =
        "Логин должен содержать минимум 7 символов и максимум - 255";
    }

    // Password validation - UPDATED LENGTH TO 255
    if (!formData.password) {
      newErrors.password = "Требуется пароль";
    } else if (
      !/^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{7,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Пароль должен содержать 7 латинских букв, минимум 1 прописную букву и 1 цифру";
    } else if (formData.password.length >= 255) {
      newErrors.password = "Пароль не должен превышать 255 символов";
    }

    // Repeat password validation
    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Повторите пароль";
    } else if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = "Пароли не совпадают";
    }

    // Full name validation
    if (!formData.full_name) {
      newErrors.full_name = "Требуется ФИО";
    } else if (formData.full_name.length >= 255) {
      newErrors.full_name = "ФИО не должно превышать 255 символов";
    }

    // Phone validation
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!formData.phone_number) {
      newErrors.phone_number = "Требуется номер телефона";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Не российский формат телефонного номера";
    }

    // Birth date validation
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!formData.birth_date) {
      newErrors.birth_date = "Требуется дата рождения";
    } else if (!dateRegex.test(formData.birth_date)) {
      newErrors.birth_date = "Введите в формате ДД.ММ.ГГГГ";
    } else {
      // Проверка что пользователю не менее 18 лет
      const birthDate = new Date(formData.birth_date);
      const today = new Date();

      // Вычисляем минимальную дату для 18 лет
      const minDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      if (birthDate > minDate) {
        newErrors.birth_date = "Вам должно быть не менее 18 лет";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(SERVER_LOCATION + SIGN_UP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Регистрация прошла успешно!",
        });
        // Reset form on success
        setFormData({
          login: "",
          password: "",
          repeatPassword: "",
          full_name: "",
          phone_number: "",
          birth_date: "",
        });
      } else {
        setSubmitStatus({ success: false, message: result.data.message });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Ошибка сети. Повторите позже.",
      });
    }
  };

  return (
    <div className="signup-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <h2>Регистрация</h2>

      {submitStatus.message && (
        <div className={`alert ${submitStatus.success ? "success" : "error"}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Login Field */}
        <div className="form-group">
          <label>Логин*</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className={errors.login ? "error-input" : ""}
          />
          {errors.login ? (
            <span className="error">{errors.login}</span>
          ) : (
            <div className="hint">
              7-14 символов. Должен содержать минимум 1 цифру
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group password-field">
          <label>Пароль*</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
              maxLength={255}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password ? (
            <span className="error">{errors.password}</span>
          ) : (
            <div className="hint">
              Пароль должен содержать 7 латинских букв, минимум 1 прописную
              букву и 1 цифру
            </div>
          )}
        </div>

        {/* Repeat Password */}
        <div className="form-group password-field">
          <label>Повторение пароля*</label>
          <div className="password-input-container">
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className={errors.repeatPassword ? "error-input" : ""}
              maxLength={255}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              aria-label={
                showRepeatPassword ? "Hide password" : "Show password"
              }
            >
              {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.repeatPassword && (
            <span className="error">{errors.repeatPassword}</span>
          )}
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label>ФИО*</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={errors.full_name ? "error-input" : ""}
            maxLength={255}
          />
          {errors.full_name && (
            <span className="error">{errors.full_name}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Номер телефона*</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="8 (917) 324-21-21"
            className={errors.phone_number ? "error-input" : ""}
            maxLength={19}
          />
          {errors.phone_number ? (
            <span className="error">{errors.phone_number}</span>
          ) : (
            ""
          )}
        </div>

        {/* Birth Date */}
        <div className="form-group">
          <label>Дата рождения*</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className={errors.birth_date ? "error-input" : ""}
          />
          {errors.birth_date ? (
            <span className="error">{errors.birth_date}</span>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className="submit-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default SignUp;
