import { useForm } from "react-hook-form";
import { useUser } from "../components/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result.split(",")[1]);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export default function BlogEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();
  const { user } = useUser();

  const onSubmit = async (data) => {
    console.log("test");
    data.image?.length == 1
      ? (data.image = await convertToBase64(data.image[0]))
      : null;
    console.log(data);
    if (errors.title || errors.content || errors.image) {
      return;
    }
    try {
      const response = await axios.post("api/blogs", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
      if (response.statusText != "OK" || response.data.errors) {
        return;
      }
      Navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-around min-h-[70vh] absolute top-[5%] left-[30%] right-[70%] bottom-[95%]
        bg-slate-50 rounded-md shadow-md z-10 min-w-[40%] overflow-auto outline-slate-400 outline"
        id="blog-edit"
      >
        <h1 className="text-xl font-semibold">Create Blog</h1>
        <div className="flex flex-col">
          <label htmlFor="title">
            <span>
              Title <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="text"
            name="title"
            id="title"
            {...register("title", {
              required: true,
              maxLength: 20,
              trim: (value) => !!value.trim(),
            })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image">
            <span>Image</span>
          </label>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="file"
            name="image"
            id="image"
            {...register("image", {
              required: false,
              custom: (value) => {
                if (
                  value[0].size > 1000000 ||
                  value[0].type !== "image/jpeg" ||
                  value[0].type !== "image/png"
                ) {
                  return false;
                }
                return true;
              },
            })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">
            <span>
              Contents <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            className="p-2 m-2 border-2 border-gray-300 rounded-md resize-none w-72 max-h-36"
            type="text"
            name="content"
            id="content"
            {...register("content", {
              required: true,
              trim: (value) => !!value.trim(),
            })}
          />
        </div>
        <button
          className={`p-2 m-2 transition duration-300 ease-in-out border-2 border-gray-300 rounded-md hover:bg-gray-300 `}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
