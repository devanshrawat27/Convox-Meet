import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users"
});

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    const request = await client.post("/register", {
      name,
      username,
      password
    });

    return request.data.message;
  };

  const handleLogin = async (username, password) => {
    const request = await client.post("/login", {
      username,
      password
    });

    localStorage.setItem("token", request.data.token);
    setUserData(request.data.user);
    router("/");

    return request.data.message;
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ⭐ THIS WAS MISSING */
export const useAuth = () => useContext(AuthContext);
