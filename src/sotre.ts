import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./page/blog/blog.reducer";
import { useDispatch } from "react-redux";
import { blogAPI } from "./page/blogRTK/blog.service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogAPI.reducerPath]: blogAPI.reducer, // Thêm reducer dc tạo từ API slice
  },

  // Thêm midleware để enable các tính năng catching, invalidation, polling của RTK-query
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(blogAPI.middleware);
  },
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconent
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// dùng khi gọi async thunk
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //
