import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5050",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // log out the cookie refresh token
    console.log("refresh token:", document.cookie.split(";"));

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setToken({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status !== 200) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
      // here is possibly needed to dispatch an action to logout the user
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      onfulfilled: (data, { dispatch }) => {
        dispatch(setCredentials(data));
      },
    }),
    getUser: builder.query({
      query: () => "/user",
    }),
  }),
});
