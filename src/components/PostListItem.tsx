import Card from "@material-ui/core/Card";
import Share from "@material-ui/icons/Share";
import Avatar from "@material-ui/core/Avatar";
import RepeatIcon from "@material-ui/icons/Repeat";
import ReportIcon from "@material-ui/icons/Report";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { Post } from "../store/blog/types";
import useStyles from "./styles/PostListItem";

interface PostListItemProps {
  post: Post;
}

function PostListItem({ post }: PostListItemProps) {
  const classes = useStyles();

  return (
    <Card className={classes.mb2}>
      <CardHeader
        subheader={post.timestamp}
        title={
          <>
            <b>{post.user.name}</b>&nbsp;
            <small>@{post.user.username}</small>
          </>
        }
        avatar={
          <Avatar style={{ background: "red" }}>
            {post.user.name[0].toUpperCase()}
          </Avatar>
        }
      />
      <CardContent className={classes.p0}>
        <Typography>{post.body}</Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.pt0}>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
        <IconButton>
          <RepeatIcon />
        </IconButton>
        <IconButton className={classes.mlAuto}>
          <Share />
        </IconButton>
        <IconButton>
          <ReportIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostListItem;
