import React, { useState, useEffect } from 'react';
import PostList from '../../components/PostList';
import { useGetAllPostsQuery } from '../../features/posts/postsApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const Home = () => {
    const { data: posts = [], isFetching } = useGetAllPostsQuery();

    let content;

    if (isFetching) {
        content = (
            <div className="flex justify-center">
                <PulseLoader color={'#FFF'} />
            </div>
        );
    } else if (!posts.length) {
        content = <p className="text-center">No posts available.</p>;
    } else {
        content = <PostList posts={posts} />;
    }

    return (
        <section>
            <h1 className="head-text mb-10">Posts Overview</h1>
            {/* main content */}
            {content}
        </section>
    );
};

export default Home;
