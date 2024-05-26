import React, { useState, useEffect } from 'react';
import PostList from '../../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchPosts = async () => {
      // Simulate an API call
      const response = await fetch('http://example.com/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts().catch(console.error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Posts Overview</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
