import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { Post } from "../../types/post";
import http from "../../util/http";

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
  loading: Boolean;
  currentRequestId: undefined | string;
  // For RTK Qury
  postId: string;
}
const initialState: BlogState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined,
  postId: "",
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    const respone = await http.get<Post[]>("", {
      signal: thunkAPI.signal,
    });
    return respone.data;
  }
);

export const createPost = createAsyncThunk(
  "blog/createPost",
  async (body: Post, thunkAPI) => {
    const respone = await http.post<Post>("", body, {
      signal: thunkAPI.signal,
    });
    return respone.data;
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async (body: Post, thunkAPI) => {
    const respone = await http.put<Post>(`${body._id}`, body, {
      signal: thunkAPI.signal,
    });
    return respone.data;
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (psotId: string, thunkAPI) => {
    const respone = await http.delete(`${psotId}`, {
      signal: thunkAPI.signal,
    });
    return respone.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    startEdiingtPost: (state, action: PayloadAction<String>) => {
      const postId = action.payload;
      console.log(postId);
      const foundPost =
        state.postList.find((post) => post._id === postId) || null;
      state.editingPost = foundPost;
    },
    cancelEditingPost: (state) => {
      state.editingPost = null;
    },
    startEdiingtPostRTK: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    endEdiingtPostRTK: (state, action: PayloadAction) => {
      state.postId = "";
    },
  },
  // Gọi asyncThunk phải gọi tron extraReducers
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postId = action.payload._id;
        console.log(postId);
        console.log(action.payload);
        state.postList.some((post, index) => {
          if (post._id === postId) {
            state.postList[index] = action.payload;
            return true;
          }
          return false;
        });
        state.editingPost = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("Befor Delete: ", current(state));
        const postId = action.meta.arg; // Đây chính là param postId khai báo ở trên deletePost Async Thunk

        const foundPostIndex = state.postList.findIndex(
          (post) => post._id === postId
        );

        if (foundPostIndex != -1) {
          state.postList.splice(foundPostIndex, 1);
        }
        console.log("After Delete: ", current(state));
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId; // Khi goi AyncThunk sẽ sinh ra requestId (là độc nhất)
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      );
  },
});
export const {
  cancelEditingPost,
  startEdiingtPost,
  startEdiingtPostRTK,
  endEdiingtPostRTK,
} = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
