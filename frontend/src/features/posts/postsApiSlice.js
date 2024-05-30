import { apiSlice } from '../../app/api/appSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (postData) => ({
                url: '/post/create',
                method: 'POST',
                body: postData,
            }),
        }),
        getPostById: builder.query({
            query: (id) => `/post/view/${id}`,
        }),
        getAllPosts: builder.query({
            query: () => '/post/all',
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetPostByIdQuery,
    useGetAllPostsQuery,
} = postsApiSlice;
