import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/users",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: { role },
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useGetCurrentUserQuery
} = userAuthApi;

export default userAuthApi;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const userAuthApi = createApi({
//     reducerPath: 'userApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api/users',
//         credentials: "include",
//     }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: (newUser) => ({
//                 url: "/register",
//                 method: "POST",
//                 body: newUser,
//             }),
//         }),
//         loginUser: builder.mutation({
//             query: (credentials) => ({
//                 url: '/login',
//                 method: "POST",
//                 body: credentials
//             })
//         }),
//         logoutUser: builder.mutation({
//             query: () => ({
//                 url: "/logout",
//                 method: "POST",

//             })
//         }),
//         getUser: builder.query({
//             query: () => ({
//                 url: "/users",
//                 method: "GET"
//             }),
//             refetchOnMount: true,
//             invalidatesTags: ["User"]
//         }),
//         deleteUser: builder.mutation({
//             query: (userId) => ({
//                 url: `/users/${userId}`,
//                 method: "DELETE"
//             })
//         }),
//         updateUserRole: builder.mutation({
//             query: ({ userId, role }) => ({
//                 url: `/users/${userId}`,
//                 method: "PUT",
//                 body: { role }
//             }),
//             refetchOnMount: true,
//             invalidatesTags: ["User"]

//         })

//     })
// })

// export const {
//     useRegisterUserMutation,
//     useLoginUserMutation,
//     useLogoutUserMutation,
//     useGetUserQuery,
//     useDeleteUserMutation,
//     useUpdateUserRoleMutation
// } = userAuthApi;

// export default userAuthApi