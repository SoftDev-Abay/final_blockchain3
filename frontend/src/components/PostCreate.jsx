import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {  
    event.preventDefault();

    if (!title.trim() || !content.trim() || !image.trim()) {
      setError('All fields are required and must be filled out.'); 
      return; 
    }

    const postData = {
      title, content, image
    };

    try {
      const response = await fetch('http://localhost:5050/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
      // Optionally handle a redirect or state update here
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('Failed to send data. Please try again.');
    };
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <p className="text-red-500">{error}</p>}
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

        <button type="submit" className="bg-primary-500 text-white p-2">
          Create Post
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
