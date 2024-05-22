import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../types/post";

export const blogAPI = createApi({
  reducerPath: "blogApi", // Tên filed trong redux state
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (build) => ({
    // Generic Type theo thứ tự là response trả về và agrument
    getPosts: build.query<Post[], void>({
      query: () => "", // Này là đường dẫn và method không có argument và "là url của api vd: localhost:3000/'example' "
      // Khi getPost chạy thành công sẽ chạy providesTag. (result) => là kết quả khi getPosts thành công
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ _id }) => ({ type: "Posts" as const, _id })), // type = "" là do khai báo tagType: [""], VD: Nếu tagType = ['POST'] thì ở đây typ cũng = 'POST
            { type: "Posts" as const, _id: "LIST" },
          ];
          return final;
        }

        const final = [{ type: "Posts" as const, _id: "LIST" }];
        return final;
      },
    }),
    createPost: build.mutation<Post, Omit<Post, "id">>({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) => [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<Post, string>({
      query: (id) => `/${id}`,
    }),
    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      // trong trường hợp này  getPosts sẽ chạy lại
      invalidatesTags: (result, error, body) => [
        { type: "Posts", _id: body.id },
      ],
    }),
  }),
});

// Từ sinh ra dự trên getPosts: builder.query ở trên
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} = blogAPI;
