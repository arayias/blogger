import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh]"
      id="error-page"
    >
      <h1 className="text-4xl">Oops!</h1>
      <p className="">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
