import React from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "src/context/Blog";
const post = {
  title: "Static Post Title",
  content: "Static Post Content",
};

const ViewPost = ({ image, content, title, publicKey }) => {
  console.log("fasfasadadasdasd");

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>

      {image ? (
        <img
          src={image}
          alt="Post visual"
          className="mb-4 max-w-full h-auto rounded-md"
        />
      ) : (
        <img
          src={"https://shorturl.at/rjI3l"}
          alt="Post visual"
          className="mb-4 max-w-full h-auto rounded-md"
        />
      )}

      <p className="text-gray-700 mb-4">{content}</p>
      {
        <p className="text-sm text-gray-500">
          Published on: {new Date().toLocaleDateString("en-US")}
        </p>
      }
      {<p className="text-sm text-gray-600">By: Static Author</p>}
    </div>
  );
};

export default ViewPost;
