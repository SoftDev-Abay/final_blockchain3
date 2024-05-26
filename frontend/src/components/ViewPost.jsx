import React from 'react';

const ViewPost = ({ title, content, image, createdAt, author }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      {image && <img src={image} alt="Post visual" className="mb-4 max-w-full h-auto rounded-md"/>}
      <p className="text-gray-700 mb-4">{content}</p>
      {createdAt && <p className="text-sm text-gray-500">Published on: {new Date(createdAt).toLocaleDateString("en-US")}</p>}
      {author && author.name && <p className="text-sm text-gray-600">By: {author.name}</p>}
    </div>
  );
};

export default ViewPost;
