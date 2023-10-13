export default function CommentForm() {
  return (
    <form className="mt-5">
      <textarea
        className="w-full p-2 border-2 border-gray-300 rounded-md"
        name="comment"
        id="comment"
        cols="20"
        rows="1"
      ></textarea>
      <button className="p-2 mt-2 border-2 border-gray-300 rounded-md">
        Submit
      </button>
    </form>
  );
}
