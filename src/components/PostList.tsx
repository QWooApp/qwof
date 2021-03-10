import PostListItem from "./PostListItem";
import { usePosts } from "../store/blog/hooks";

function PostList() {
  const posts = usePosts();

  return (
    <div>
      <br />
      {posts.map((post, idx) => (
        <PostListItem post={post} key={idx} />
      ))}
    </div>
  );
}

export default PostList;
