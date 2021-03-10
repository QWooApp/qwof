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
import Dialog from "@material-ui/core/Dialog";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import RepeatIcon from "@material-ui/icons/Repeat";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DialogActions from "@material-ui/core/DialogActions";
import CardActionArea from "@material-ui/core/CardActionArea";

import useStyles from "./styles/PostListItem";
import { createPost, deletePost } from "../api/blog";
import { createHeart, deleteHeart } from "../api/heart";
import { useAuthenticated, useToken, useUsername } from "../store/auth/hooks";
import {
  Post,
  POST_DIALOG_REPLY,
  POST_DIALOG_REPOST,
} from "../store/blog/types";
import {
  openDialogWithPost,
  prependPost,
  heartPost,
  unheartPost,
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
  const [repostTypeDialog, setRepostTypeDialog] = useState<boolean>(false);

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

  const { is_only_repost } = post;
  if (is_only_repost) noAction = true;

  const handleDeleteClick = () => {
    deletePost(token!, post.id).then(() => dispatch(deletePostAction(post.id)));
  };

  const handleRepostClick = () => {
    setRepostTypeDialog(true);
  };

  const handleRepostWithQuote = () => {
    setRepostTypeDialog(false);
    dispatch(openDialogWithPost(post, POST_DIALOG_REPOST));
  };

  const handleBlankRepost = () => {
    createPost(token!, "", { repost_of_id: post.id }).then((resPost) =>
      dispatch(prependPost(resPost))
    );
    setRepostTypeDialog(false);
  };

  const handleRepostTypeDialogClose = () => {
    setRepostTypeDialog(false);
  };

  const handleReplyClick = () => {
    dispatch(openDialogWithPost(post, POST_DIALOG_REPLY));
  };

  const handleHeartClick = () => {
    const id = is_only_repost ? post.repost_of?.id! : post.id;
    if (is_only_repost ? post.repost_of?.is_hearted : post.is_hearted)
      deleteHeart(token!, id).then(() => dispatch(unheartPost(id)));
    else createHeart(token!, id).then(() => dispatch(heartPost(id)));
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
        {is_only_repost && (
          <ListItem>
            <ListItemIcon>
              <RepeatIcon />
            </ListItemIcon>
            <ListItemText>
              Reposted by{" "}
              <Link component={RouterLink} to={`/user/${post.user.username}`}>
                {post.user.name}
              </Link>
            </ListItemText>
          </ListItem>
        )}
        {is_only_repost && <Divider />}
        <CardActionArea component={RouterLink} to={`/post/${post.id}/`}>
          <CardHeader
            subheader={
              is_only_repost ? post.repost_of?.timestamp : post.timestamp
            }
            avatar={
              <Avatar style={{ background: "red" }}>
                {(is_only_repost
                  ? post.repost_of!.user.name
                  : post.user.name)[0].toUpperCase()}
              </Avatar>
            }
            title={
              <>
                <b>
                  {is_only_repost ? post.repost_of?.user.name : post.user.name}
                </b>
                &nbsp;
                <small>
                  @
                  {is_only_repost
                    ? post.repost_of?.user.name
                    : post.user.username}
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
              <Linkify>
                <span style={{ paddingBottom: post.is_repost ? "40px" : "0" }}>
                  {is_only_repost ? post.repost_of?.body : post.body}
                </span>
              </Linkify>
              {post.is_repost && !post.is_only_repost && (
                <PostListItem post={post.repost_of} />
              )}
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
              {is_only_repost ? post.repost_of?.reply_count : post.reply_count}
            </Button>
            <Button
              onClick={handleHeartClick}
              startIcon={<FavoriteIcon />}
              color={
                (is_only_repost ? post.repost_of?.is_hearted : post.is_hearted)
                  ? "primary"
                  : "secondary"
              }
            >
              {is_only_repost ? post.repost_of?.heart_count : post.heart_count}
            </Button>
            <Button color="secondary" onClick={handleRepostClick}>
              <RepeatIcon />
              {is_only_repost
                ? post.repost_of?.repost_count
                : post.repost_count}
            </Button>
            <Dialog
              fullWidth
              maxWidth="xs"
              open={repostTypeDialog}
              onClose={handleRepostTypeDialogClose}
            >
              <DialogTitle>
                <Typography align="center">Repost Post</Typography>
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleBlankRepost} color="primary">
                  Repost
                </Button>
                <Button
                  autoFocus
                  color="primary"
                  onClick={handleRepostWithQuote}
                >
                  Repost with Quote
                </Button>
              </DialogActions>
            </Dialog>
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
