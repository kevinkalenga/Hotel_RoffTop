// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
    // the name of the reducer
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include'
    }),
    endpoints: (builder) => (
        {
            fetchBlogs: builder.query({
                query: ({ search = '', category = '', location = '' }) => `/blog?search=${search}
                  &category=${category}&location=${location}`
            })
        }
    )
})

export const { useFetchBlogsQuery } = blogApi