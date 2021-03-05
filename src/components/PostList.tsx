import LinearProgress from "@material-ui/core/LinearProgress";

import { usePosts } from "../store/blog/hooks";
import PostListItem from "./PostListItem";

function PostList() {
  const posts = usePosts();

  if (posts.length !== 0)
    return (
      <div>
        <br />
        {posts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </div>
    );
  else return <LinearProgress />;
}

export default PostList;
