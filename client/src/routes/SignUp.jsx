import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/AuthProvider";
import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const { userLogin } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (errors.username || errors.password || errors.confirmedPassword) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("api/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      if (response.statusText != "OK" || response.data.errors) {
        setError("Error when creating user try an alternative username");
        setLoading(false);
        return;
      }
      setError(null);
      userLogin(response.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("A fetching error occurred");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div id="signup" className="flex flex-col items-center content-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center p-2 rounded-md shadow-md bg-slate-50"
      >
        <label className="flex flex-col items-left min-w[1/2]">
          <span className="mx-2 mt-1 font-semibold required">Username</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="text"
            id="username"
            name="username"
            {...register("username", {
              required: true,
              maxLength: 20,
              trim: (value) => !!value.trim(),
            })}
          />
          {errors.username?.type === "required" && (
            <span className="text-red-500 max-w-[20ch]">
              🛑 This field is required
            </span>
          )}
          {errors.username?.type === "maxLength" && (
            <span className="text-red-500 max-w-[20ch]">
              🛑 Max Length of 20 exceeded
            </span>
          )}
        </label>
        <label className="flex flex-col items-left">
          <span className="mx-2 mt-1 font-semibold">Password</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: true,
              maxLength: 20,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              trim: (value) => !!value.trim(),
            })}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 max-w-[25ch]">
              🛑 This field is required
            </span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="text-red-500 max-w-[25ch]">
              🛑 Max Length of 20 exceeded
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500 max-w-[25ch]">
              🛑 Password must contain at least 8 characters, one letter, and
              one number
            </span>
          )}
        </label>
        <label className="flex flex-col items-left">
          <span className="mx-2 mt-1 font-semibold">Confirm Password</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="password"
            id="confirmedPassword"
            {...register("confirmedPassword", {
              required: true,
              validate: (value) => value === getValues("password"),
            })}
          />
          {errors.confirmedPassword?.type === "required" && (
            <span className="text-red-500 max-w-[25ch]">
              🛑 This field is required
            </span>
          )}
          {errors.confirmedPassword?.type === "validate" && (
            <span className="text-red-500 max-w-[25ch]">
              🛑 Passwords must match
            </span>
          )}
        </label>
        {error != null && (
          <span className="text-red-500 max-w-[20ch]">{error}</span>
        )}

        <button
          type="submit"
          className={`p-2 m-2 transition duration-300 ease-in-out border-2 border-gray-300 rounded-md hover:bg-green-400 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          Sign-Up
        </button>
      </form>
    </div>
  );
}
