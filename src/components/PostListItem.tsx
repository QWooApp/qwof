import { useDispatch } from "react-redux";
import { MouseEvent, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Linkify from "linkifyjs/react";
import Menu from "@material-ui/core/Menu";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Share from "@material-ui/icons/Share";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CardActionArea from "@material-ui/core/CardActionArea";

import { deletePost } from "../api/blog";
import useStyles from "./styles/PostListItem";
import { createHeart, deleteHeart } from "../api/heart";
import { Post, POST_DIALOG_REPLY } from "../store/blog/types";
import { useAuthenticated, useToken, useUsername } from "../store/auth/hooks";
import {
  heartPost,
  unheartPost,
  openDialogWithPost,
  deletePost as deletePostAction,
} from "../store/blog/actions";

interface PostListItemProps {
  noReply?: boolean;
  post?: Post | null;
  noAction?: boolean;
}

function PostListItem({ post, noReply, noAction }: PostListItemProps) {
  const token = useToken();
  const classes = useStyles();
  const dispatch = useDispatch();

  const username = useUsername();
  const isAuthenticated = useAuthenticated();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!post)
    return (
      <>
        <Card>
          <CardContent>
            <Typography color="secondary">
              The post is no longer available.
            </Typography>
          </CardContent>
        </Card>
      </>
    );

  const handleDeleteClick = () => {
    deletePost(token!, post.id).then(() => dispatch(deletePostAction(post.id)));
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
      {!noReply &&
        post.is_reply &&
        (post.reply_to ? (
          <PostListItem noReply noAction post={post.reply_to} />
        ) : (
          <PostListItem />
        ))}
      <Card
        style={{
          paddingBottom: noAction ? "10px" : "0",
          marginLeft: post.is_reply && post.reply_to ? "20px" : "0",
        }}
        className={post.is_reply && post.reply_to ? "" : classes.mt2}
      >
        <CardActionArea component="div">
          <CardHeader
            subheader={post.timestamp}
            avatar={
              <RouterLink to={`/user/${post.user.username}`}>
                <Avatar style={{ background: "red" }}>
                  {post.user.name[0].toUpperCase()}
                </Avatar>
              </RouterLink>
            }
            title={
              <>
                <b>{post.user.name}</b>
                &nbsp;
                <small>
                  <Link
                    component={RouterLink}
                    to={`/user/${post.user.username}`}
                  >
                    @{post.user.username}
                  </Link>
                </small>
              </>
            }
            action={
              !noAction && (
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
              )
            }
          />
          <CardContent className={classes.p0}>
            <Typography>
              <Linkify>{post.body}</Linkify>
            </Typography>
          </CardContent>
        </CardActionArea>
        {!noAction && (
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
            <IconButton className={classes.mlAuto}>
              <Share />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
}

export default PostListItem;
