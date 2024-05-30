import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
    if (!posts.length) {
        return <p className="text-center">No posts available.</p>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post, index) => (
                <div
                    key={'post' + index}
                    className="bg-gray-800 text-white p-4 rounded-lg"
                >
                    <Link
                        to={`/posts/${post.publicKey}`}
                        className="hover:underline"
                    >
                        <h3 className="text-lg font-bold">
                            {post.account.title}
                        </h3>
                    </Link>
                    <p> {post.account.content}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
