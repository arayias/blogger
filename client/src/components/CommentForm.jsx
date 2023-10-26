import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "../components/AuthProvider";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CommentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { user } = useUser();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (errors.comment) {
      setError("Comment must be between 1 and 100 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`/api/comments/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data.errors);
      console.log(res.data);
      if (res.statusText != "OK" || res.data.errors) {
        setError(res.data.errors);
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate(0);
    } catch (err) {
      setError("A fetching error occurred");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="w-full p-2 border-2 border-gray-300 rounded-md max-h-12"
        name="comment"
        id="comment"
        cols="20"
        rows="1"
        {...register("comment", {
          required: true,
          maxLength: 100,
        })}
      ></textarea>
      <p>{errors.comment && "Comment must be between 1 and 100 characters"}</p>
      <button
        className="p-2 mt-2 border-2 border-gray-300 rounded-md"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}
