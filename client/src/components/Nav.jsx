import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav>
        <ul className="flex flex-row p-2 text-white bg-gray-800 shadow-md">
          <Link className="mr-auto" to="/">
            Home
          </Link>
          <Link className="mr-5" to="/login">
            Login
          </Link>
          <Link className="mr-1.5" to="/signup">
            Sign-Up
          </Link>
        </ul>
      </nav>
    </>
  );
}
