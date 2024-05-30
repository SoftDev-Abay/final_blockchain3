import React, { useState, useEffect } from "react";
import PostList from "../../components/PostList";
// import { useGetAllPostsQuery } from '../../features/posts/postsApiSlice';
import { useBlog } from "src/context/Blog";
const Home = () => {
  const { posts } = useBlog();

  const transformedPosts = posts.map((post) => {
    return {
      ...post.account,
      publicKey: post.publicKey.toBase58(),
    };
  });

  let content;

  if (!posts.length) {
    content = <p className="text-center">No posts available.</p>;
  } else {
    content = <PostList posts={posts} />;
  }

  console.log(posts);

  return (
    <section>
      <h1 className="head-text mb-10">Posts Overview</h1>
      {/* main content */}
      {content}
    </section>
  );
};

export default Home;
