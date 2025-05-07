import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './features/blogs/blogApis'
import userAuthApi from './features/userAuth/userAuthApi'
import userAuthReducer from './features/userAuth/userAuthSlice'

export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        auth: userAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware, userAuthApi.middleware),
})