export default function Blogs() {
  return (
    <div id="blog-view" className="grid grid-cols-4 gap-4 p-4 mt-2 ">
      <div className="flex flex-col p-4 rounded-md shadow-md ">
        <img
          className="object-cover w-full rounded-md h-36"
          src="https://images.unsplash.com/photo-1694930103616-52043332f156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzE1NDA0Nw&ixlib=rb-4.0.3&q=80&w=1080"
          alt="blog"
        />
        <h1 className="text-xl font-semibold">Blog Title</h1>
        <p className="text-sm">Blog short description should be truncated</p>
        <p className="text-sm italic">Blog Author</p>
      </div>
    </div>
  );
}
