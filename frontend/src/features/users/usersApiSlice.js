import { apiSlice } from '../../app/api/appSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
        }),
        searchUsers: builder.query({
            query: (query) => `/search?query=${query}`,
        }),
        getFriends: builder.query({
            query: () => '/friends',
        }),
        getUser: builder.query({
            query: (id) => `/${id}`,
        }),
    }),
});

export const {
    useGetUsersQuery,
    useSearchUsersQuery,
    useGetFriendsQuery,
    useGetUserQuery,
    useSendFriendRequestMutation,
} = usersApiSlice;
