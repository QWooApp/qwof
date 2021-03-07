import { useDispatch } from "react-redux";
import { MouseEvent, useState } from "react";

import Linkify from "linkifyjs/react";
import Menu from "@material-ui/core/Menu";
import Card from "@material-ui/core/Card";
import Share from "@material-ui/icons/Share";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import RepeatIcon from "@material-ui/icons/Repeat";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import { deletePost } from "../api/blog";
import useStyles from "./styles/PostListItem";
import { createHeart, deleteHeart } from "../api/heart";

import { useAuthenticated, useToken, useUsername } from "../store/auth/hooks";
import {
  Post,
  POST_DIALOG_REPLY,
  POST_DIALOG_REPOST,
} from "../store/blog/types";
import {
  heartPost,
  unheartPost,
  openDialogWithPost,
  deletePost as deletePostAction,
} from "../store/blog/actions";

interface PostListItemProps {
  post: Post;
}

function PostListItem({ post }: PostListItemProps) {
  const token = useToken();
  const classes = useStyles();
  const dispatch = useDispatch();

  const username = useUsername();
  const isAuthenticated = useAuthenticated();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDeleteClick = () => {
    deletePost(token!, post.id).then(() => dispatch(deletePostAction(post.id)));
  };

  const handleRepostClick = () => {
    dispatch(openDialogWithPost(post, POST_DIALOG_REPOST));
  };

  const handleReplyClick = () => {
    dispatch(openDialogWithPost(post, POST_DIALOG_REPLY));
  };

  const handleHeartClick = () => {
    if (post.is_hearted)
      deleteHeart(token!, post.id).then(() => dispatch(unheartPost(post.id)));
    else createHeart(token!, post.id).then(() => dispatch(heartPost(post.id)));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Card className={classes.mb1}>
        <Divider />
        <CardHeader
          subheader={post.timestamp}
          title={
            <>
              <b>{post.user.name}</b>&nbsp;
              <small>@{post.user.username}</small>
            </>
          }
          action={
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                keepMounted
                id="simple-menu"
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Report />
                  </ListItemIcon>
                  Report
                </MenuItem>
                {isAuthenticated && post.user.username === username && (
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleDeleteClick();
                    }}
                  >
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                )}
              </Menu>
            </>
          }
          avatar={
            <Avatar style={{ background: "red" }}>
              {post.user.name[0].toUpperCase()}
            </Avatar>
          }
        />
        <CardContent className={classes.p0}>
          <Typography>
            <Linkify>{post.body}</Linkify>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.pt0}>
          <Button
            color="secondary"
            onClick={handleReplyClick}
            startIcon={<ChatBubbleIcon />}
          >
            {post.reply_count}
          </Button>
          <Button
            onClick={handleHeartClick}
            startIcon={<FavoriteIcon />}
            color={post.is_hearted ? "primary" : "secondary"}
          >
            {post.heart_count}
          </Button>
          <Button color="secondary" onClick={handleRepostClick}>
            <RepeatIcon />
            {post.repost_count}
          </Button>
          <IconButton className={classes.mlAuto}>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default PostListItem;
