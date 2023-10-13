import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { UserProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <UserProvider>
        <div className="min-w-[100vw] min-h-screen">
          <Nav />
          <Outlet />
        </div>
      </UserProvider>
    </div>
  );
}
