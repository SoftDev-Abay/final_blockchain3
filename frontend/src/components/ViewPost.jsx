import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/posts/postsApiSlice';
const ViewPost = () => {
    const { id } = useParams();

    const { data: post, error, isLoading } = useGetPostByIdQuery(id);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    const { title, content, image, createdAt, author } = post;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 my-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            {image && (
                <img
                    src={image}
                    alt="Post visual"
                    className="mb-4 max-w-full h-auto rounded-md"
                />
            )}
            <p className="text-gray-700 mb-4">{content}</p>
            {createdAt && (
                <p className="text-sm text-gray-500">
                    Published on:{' '}
                    {new Date(createdAt).toLocaleDateString('en-US')}
                </p>
            )}
            {author && author.name && (
                <p className="text-sm text-gray-600">By: {author.name}</p>
            )}
        </div>
    );
};

export default ViewPost;
