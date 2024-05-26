import { apiSlice } from '../../app/api/appSlice';

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendFriendRequest: builder.mutation({
            query: (body) => ({
                url: '/friendship/send-request',
                method: 'POST',
                body,
            }),
        }),
        acceptFriendRequest: builder.mutation({
            query: (body) => ({
                url: '/friendship/accept-request',
                method: 'POST',
                body,
            }),
        }),
        getFriendRequests: builder.query({
            query: () => '/friendship/requests',
        }),
    }),
});

export const {
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useGetFriendRequestsQuery,
} = friendsApiSlice;
