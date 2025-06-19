// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { SERVER_LOCATION, GET_USER } from "./Constants/Server";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = (username, token) => {
    // const { data } = await fetch(SERVER_LOCATION + GET_USER + `/${username}`, {
    //   method: "GET",
    // });

    // console.log({ login });

    // const userData = {
    //   username,
    //   token,
    //   phone_number: data.User.phone_number,
    // };

    // setUser(userData);
    // sessionStorage.setItem("user", JSON.stringify(userData));

    fetch(SERVER_LOCATION + GET_USER + `/${username}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        const userData = {
          username,
          token,
          phone_number: data.data.User.phone_number,
          id: data.data.User.id,
        };

        console.log({ userData });
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    // Add any additional cleanup here (e.g., API call to invalidate token)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
