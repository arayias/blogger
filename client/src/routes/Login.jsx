export default function Login() {
  return (
    <div id="login" className="flex flex-col items-center content-center">
      <form
        action="/login"
        method="POST"
        className="flex flex-col items-center p-2 rounded-md shadow-md bg-slate-50"
      >
        <label className="flex flex-col items-left min-w[1/2]">
          <span className="mx-2 mt-1 font-semibold">Username</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="text"
            id="username"
          />
        </label>
        <label className="flex flex-col items-left">
          <span className="mx-2 mt-1 font-semibold">Password</span>
          <input
            className="p-2 m-2 border-2 border-gray-300 rounded-md"
            type="password"
            id="password"
          />
        </label>
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
