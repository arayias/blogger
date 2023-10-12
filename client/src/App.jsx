import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useState } from "react";
import { UserProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <div>
      <UserProvider>
        <Nav />
        <Outlet />
      </UserProvider>
    </div>
  );
}
