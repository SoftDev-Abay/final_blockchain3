import React, { useState, useEffect } from 'react';
import ViewPost from './ViewPost';

const PostPage = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://example.com/api/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ViewPost {...post} />
    </div>
  );
};

export default PostPage;
