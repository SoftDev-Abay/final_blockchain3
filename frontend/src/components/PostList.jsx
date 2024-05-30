import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
    if (!posts.length) {
        return <p className="text-center">No posts available.</p>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="bg-gray-800 text-white p-4 rounded-lg"
                >
                    <Link to={`/posts/${post._id}`} className="hover:underline">
                        <h3 className="text-lg font-bold">{post.title}</h3>
                    </Link>
                    <p>
                        Created at:{' '}
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        Author ID: {post.author ? post.author._id : 'Unknown'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
