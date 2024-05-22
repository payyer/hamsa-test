import { CreatePost } from "./components/CreatePost";
import { NavBar } from "./components/NavBar";
import { PostList } from "./components/PostList";

export const Blog = () => {
  return (
    <>
      <NavBar />
      <div className="m-4">
        <CreatePost />
        <PostList />
      </div>
    </>
  );
};
