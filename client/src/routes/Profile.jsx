import { useUser } from "../components/AuthProvider";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(user);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <b>Name:</b> {user.user.username}
      </p>
      <h3>
        <b>Posts:</b>
      </h3>
      <ul></ul>
    </div>
  );
}
