import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export default function BlogCards() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <>
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`flex flex-col p-4 rounded-md shadow-md`}>
          <div className="mt-1 rounded-md h-36 bg-slate-200"> </div>
          <div></div>
          <div className="h-6 mt-2 rounded-md bg-slate-400 "> </div>
          <div className="h-4 mt-1 rounded-md bg-slate-300"> </div>
          <div className="h-4 mt-1 rounded-md bg-slate-100"> </div>
        </div>
      ))}
    </>
  ) : (
    <>
      {blogs.map((blog) => (
        <Link key={blog._id} to={`/blogs/${blog._id}`}>
          <div className={`flex flex-col p-4 rounded-md shadow-md`}>
            <img
              className="object-cover w-full rounded-md h-36"
              src="https://images.unsplash.com/photo-1694930103616-52043332f156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzE1NDA0Nw&ixlib=rb-4.0.3&q=80&w=1080"
              alt="blog"
            />
            <h1 className="text-xl font-semibold">{blog.title}</h1>
            <p className="text-sm">{truncate(blog.contents, 25)}</p>
            <p className="text-sm italic">{blog.author.username}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
