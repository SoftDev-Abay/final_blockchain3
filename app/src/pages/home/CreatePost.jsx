import React, { useEffect, useState } from "react";
import { useBlog } from "src/context/Blog";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const { createPost } = useBlog();

  // const [createPost, { isLoading, error, isSuccess }] =
  //     useCreatePostMutation();

  // statics
  const isLoading = false;
  const error = null;
  const isSuccess = false;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim() || !image.trim()) {
      return;
    }

    createPost(title, content, image);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setContent("");
      setImage("");
      alert("Post created successfully");
    }
  }, [isSuccess]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-base-semibold text-light-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="no-focus border border-dark-4 bg-dark-3 text-light-1"
          placeholder="Enter post title"
        />

        <label className="text-base-semibold text-light-2">Content</label>
        <textarea
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="no-focus border border-dark-4 bg-dark-3 text-light-1"
          placeholder="What's on your mind?"
        />

        <label className="text-base-semibold text-light-2">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="no-focus border border-dark-4 bg-dark-3 text-light-1"
          placeholder="Enter image URL"
        />

        <button
          type="submit"
          className="bg-primary-500 text-white p-2"
          disabled={isLoading}
        >
          Create Post
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
