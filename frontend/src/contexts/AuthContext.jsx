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
    router("/home");

    return request.data.message;
  };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem('token')
        }
      });
      return request.data;
    } catch (err) {
      throw err;
    }
  };

  const addToUserHistory = async (meetingCode) => {  // FIX #1: meetingcode → meetingCode (parameter name)
    try {
      let request = await client.post("/add_to_activity", {  // FIX #2: "add_to_activity" → "/add_to_activity" (/ missing tha)
        token: localStorage.getItem("token"),                 // FIX #3: comma missing tha
        meeting_code: meetingCode
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router("/");
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin, getHistoryOfUser, addToUserHistory, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);