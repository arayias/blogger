export default function BlogEdit() {
  return (
    <form>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">Content</label>
      <textarea name="content" id="content" />
      <button type="submit">Submit</button>
    </form>
  );
}
