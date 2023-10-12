import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    if (errors.username || errors.password) {
      return;
    }
    console.log(data);
    const response = await fetch("api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    if (response.status === 401 || response.status === 400) {
      setErrorMessage("Invalid username or password");
      return;
    }
    setErrorMessage("");

    const result = await response.json();
    localStorage.setItem("token", result.token);
    console.log(result);
    navigate("/");
  };
  return (
    <div id="login" className="flex flex-col items-center content-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center p-2 rounded-md shadow-md bg-slate-50"
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
        {errorMessage != "" && (
          <span className="text-red-500 max-w-[20ch]">{errorMessage}</span>
        )}
        <button
          type="submit"
          className="p-2 m-2 transition duration-300 ease-in-out border-2 border-gray-300 rounded-md hover:bg-gray-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
