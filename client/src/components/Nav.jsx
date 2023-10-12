import { Link } from "react-router-dom";
import { useUser } from "./AuthProvider";

export default function Nav() {
  const { user, userLogout } = useUser();
  return (
    <>
      <nav>
        <ul className="flex flex-row p-2 text-white bg-gray-800 shadow-2xl">
          <Link className="mr-auto" to="/">
            Home
          </Link>
          {user ? (
            <>
              <Link
                className="mr-5"
                onClick={() => {
                  userLogout();
                }}
              >
                Logout
              </Link>

              <Link className="mr-1.5" to="/profile">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="mr-5" to="/login">
                Login
              </Link>

              <Link className="mr-1.5" to="/signup">
                Sign-Up
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
