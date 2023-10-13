import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentForm from "../components/CommentForm";
import axios from "axios";

export default function IndividualBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/blogs/${id}`)
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="w-[65%] mt-3 center mx-auto">
        {blog ? (
          <>
            <img
              className="object-cover w-full rounded-md h-36"
              src="https://images.unsplash.com/photo-1694930103616-52043332f156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzE1NDA0Nw&ixlib=rb-4.0.3&q=80&w=1080"
              alt="blog"
            />
            <h1 className="mt-5 text-4xl font-semibold">{blog.title}</h1>
            <p className="text-sm italic">
              {blog.author.username} - created {blog.created}{" "}
              {blog.edited == blog.created
                ? null
                : ` - last edited ${blog.lastEdit}`}
            </p>
            <p className="text-sm">{blog.contents}</p>

            <div className="mt-5">
              <h1 className="text-2xl font-semibold">Comments</h1>
              {comments.length == 0 ? (
                <>
                  <p>Be the first to add a comment!</p>
                </>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="mt-5">
                    <p className="text-sm italic">{comment.author.username}</p>
                    <p className="text-sm">{comment.contents}</p>
                  </div>
                ))
              )}

              <CommentForm />
            </div>
          </>
        ) : (
          <>
            <div className="mt-2 rounded-md h-36 bg-slate-200"> </div>
            <div className="h-10 mt-5 rounded-md bg-slate-400"> </div>
            <div className="h-5 mt-2 rounded-md bg-slate-300"> </div>
            <div className="h-16 mt-2 rounded-md bg-slate-100"> </div>
          </>
        )}
      </div>
    </>
  );
}
