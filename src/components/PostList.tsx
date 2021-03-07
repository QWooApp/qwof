import { usePosts } from "../store/blog/hooks";
import PostListItem from "./PostListItem";

function PostList() {
  const posts = usePosts();

  return (
    <div>
      <br />
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
