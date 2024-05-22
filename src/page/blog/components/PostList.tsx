import { useSelector } from "react-redux";
import { PostItem } from "./Post";
import { RootState, useAppDispatch } from "../../../sotre";
import { Fragment, useEffect } from "react";
import { getPostList } from "../blog.reducer";
import { Skeleton } from "./Skeleton";

export const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList);
  const loading = useSelector((state: RootState) => state.blog.loading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(getPostList());

    //  Lưu ý tìm hiểu về cái này để tránh gọi API nhiều lần
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
      {loading && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}

      {!loading &&
        postList.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
    </div>
  );
};
