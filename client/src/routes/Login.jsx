import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { userLogin } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let prevData;

  const onSubmit = async (data) => {
    if (errors.username || errors.password || prevData == data) {
      return;
    }
    prevData = data;
    setLoading(true);
    try {
      const response = await axios.post("api/session/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      if (response.status === 401 || response.status === 400) {
        setError("Invalid username or password");
        return;
      }
      setError(null);
      userLogin(response.data);
      navigate("/");
      setLoading(false);
    } catch {
      setError("Invalid username or password");
      setLoading(false);
    }
  };
  return (
    <div id="login" className="flex flex-col items-center content-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col items-center p-2 rounded-md shadow-md bg-slate-50 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <label className="flex flex-col items-left min-w[1/2]">
          <span className="mx-2 mt-1 font-semibold">Username</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="text"
            id="username"
            {...register("username", {
              required: true,
              maxLength: 20,
              trim: (value) => !!value.trim(),
            })}
          />
        </label>
        <label className="flex flex-col items-left">
          <span className="mx-2 mt-1 font-semibold">Password</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="password"
            id="password"
            {...register("password", {
              required: true,
              maxLength: 20,
              trim: (value) => !!value.trim(),
            })}
          />
        </label>
        {error != null && (
          <span className="text-red-500 max-w-[20ch]">{error}</span>
        )}
        <button
          type="submit"
          className={`p-2 m-2 transition duration-300 ease-in-out border-2 border-gray-300 rounded-md hover:bg-gray-300 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}
