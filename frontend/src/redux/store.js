import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './features/blogs/blogApis'
import userAuthApi from './features/userAuth/userAuthApi'
import authReducer from './features/userAuth/authSlice'
import commentApi from "./features/comments/commentApi"

export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware, userAuthApi.middleware, commentApi.middleware),
})