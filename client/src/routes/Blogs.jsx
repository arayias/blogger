import { useState } from "react";
import BlogEdit from "../components/BlogEdit";
import { useUser } from "../components/AuthProvider";
import BlogCards from "../components/BlogCards";
export default function Blogs() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  return (
    <div id="blog-view" className={`relative p-4 mt-2 overflow-x-hidden`}>
      {user ? (
        <div
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          className={`absolute top-0 z-10 p-2 tex t-sm text-white bg-gray-800 rounded-full w-10 h-10 shadow-md cursor-pointer aspect-square right-5 hover:bg-gray-700 flex items-center justify-center align-middle transform transition duration-300 ease-in-out origin-center
          ${isEditing ? "rotate-[-45deg]" : ""} `}
        >
          +
        </div>
      ) : null}

      {isEditing ? <BlogEdit /> : null}
      <div
        className={`relative grid grid-cols-4 gap-4 p-4 mt-2 ${
          isEditing ? "filter blur-sm pointer-events-none" : ""
        } overflow-x-hidden`}
      >
        <BlogCards />
      </div>
    </div>
  );
}
