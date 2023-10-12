import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userLogout = async () => {
    try {
      const res = await axios.delete("api/session/logout", user, {
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      if (res.statusText != "OK") {
        console.error("a backend error occurred during logout");
        return;
      }

      setUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  const userLogin = async (data) => {
    setUser(data);
    localStorage.setItem("token", data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLogout, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
