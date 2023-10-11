import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div>
      <h1
        className="text-4xl text-center text-green-500 "
      >
        Hello from React! Count: {count}
      </h1>
    </div>
  );
}
