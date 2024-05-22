import { Post } from "../../../types/post";
import { deletePost, startEdiingtPost } from "../blog.reducer";
import { useAppDispatch } from "../../../sotre";

interface IPost {
  post: Post;
  key: string;
}

export const PostItem = ({ post, key }: IPost) => {
  const dispatch = useAppDispatch();
  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId));
  };
  const handleStartEdittingPost = (postId: string) => {
    dispatch(startEdiingtPost(postId));
  };

  return (
    <div key={key}>
      <img
        className="sm:h-96 lg:h-[420px] w-full object-cover"
        src={post.imageURL}
        alt="img"
      />
      <h3 className="font-bold text-xl mt-2">{post.name}</h3>
      <p className="text-pretty">{post.description}</p>
      <div className="flex justify-between mt-2 text-sm text-stone-500">
        <p>{post.datePublished}</p>
        <p>{post.published ? "Publish" : "Hidden"}</p>
      </div>
      <div className="flex justify-end gap-4 mt-2">
        {/* <button className="">Xem</button> */}
        <button
          onClick={() => handleStartEdittingPost(post._id)}
          className="border border-black rounded-md px-4 font-medium hover:bg-slate-400"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeletePost(post._id)}
          className="border border-black rounded-md px-4 font-medium hover:bg-slate-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
