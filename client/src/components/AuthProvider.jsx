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
    localStorage.setItem("token", JSON.stringify(data));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      console.debug("setting user from local storage");
      setUser(token);
    } else {
      console.debug("no token found in local storage");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLogout, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
