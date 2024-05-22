import { Fragment } from "react/jsx-runtime";
import { useGetPostsQuery } from "../blog.service";
import { Skeleton } from "../../blog/components/Skeleton";
import { PostRTK } from "./PostRTK";

export const PostListRTK = () => {
  // isLoading chỉ dành cho lần fetch đầu tiên
  // isFetching là cho mỗi lần gọi API
  const { data, isLoading, isFetching } = useGetPostsQuery();
  console.log({
    data,
    isLoading,
    isFetching,
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
      {isFetching && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}
      {!isFetching &&
        data?.map((post) => {
          return <PostRTK key={post._id} post={post} />;
        })}
    </div>
  );
};
