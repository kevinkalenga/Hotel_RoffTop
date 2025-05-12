// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
    // the name of the reducer
    reducerPath: "blogsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token; // ou auth.user.token si tu stockes le token ici
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',  // Pour envoyer des cookies avec chaque requête

    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => (
        {
            fetchBlogs: builder.query({
                query: ({ search = '', category = '', location = '' }) => `/blogs?search=${search}&category=${category}&location=${location}`,
                providesTags: ['Blogs']
            }),
            fetchBlogById: builder.query({
                query: (id) => `/blogs/${id}`
            }),
            fetchRelatedBlogs: builder.query({
                query: (id) => `/blogs/related/${id}`
            }),
            postBlog: builder.mutation({
                query: (newBlog) => ({
                    url: `/blogs/create-post`,
                    method: "POST",
                    body: newBlog,
                    credentials: "include"
                }),
                invalidatesTags: ['Blogs'],
            }),
            updateBlog: builder.mutation({
                query: ({ id, ...rest }) => ({
                    url: `/blogs/update-post/${id}`,
                    method: "PATCH",
                    body: rest,
                    credentials: "include"
                }),
                invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
            }),

            deleteBlog: builder.mutation({
                query: (id) => ({
                    url: `/blogs/${id}`,
                    method: "DELETE",
                    credentials: "include"
                }),
                invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
            })
        }
    )
})

export const {
    useFetchBlogsQuery,
    useFetchBlogByIdQuery,
    useFetchRelatedBlogsQuery,
    usePostBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogApi