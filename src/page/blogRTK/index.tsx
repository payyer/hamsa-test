import { NavBar } from "../blog/components/NavBar";
import { CreatePostRTK } from "./components/CreatePostRTK";
import { PostListRTK } from "./components/PostListRTK";

export const BlogRTK = () => {
  return (
    <>
      <NavBar />
      <div className="m-4">
        <CreatePostRTK />
        <PostListRTK />
      </div>
    </>
  );
};
