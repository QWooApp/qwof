import { useDispatch } from "react-redux";
import { useState, MouseEvent } from "react";

import Linkify from "linkifyjs/react";
import Menu from "@material-ui/core/Menu";
import Card from "@material-ui/core/Card";
import Share from "@material-ui/icons/Share";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
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

import { Post } from "../store/blog/types";
import useStyles from "./styles/PostListItem";
import { createHeart, deleteHeart } from "../api/heart";
import { heartPost, unheartPost } from "../store/blog/actions";
import { useToken, useUsername, useAuthenticated } from "../store/auth/hooks";

interface PostListItemProps {
  post: Post;
  idx: number;
}

function PostListItem({ post, idx }: PostListItemProps) {
  const token = useToken();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const username = useUsername();
  const isAuthenticated = useAuthenticated();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHeartClick = () => {
    if (post.is_hearted)
      deleteHeart(token!, post.id).then(() => dispatch(unheartPost(idx)));
    else createHeart(token!, post.id).then(() => dispatch(heartPost(idx)));
  };

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card className={classes.mb1}>
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
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Report />
                </ListItemIcon>
                Report
              </MenuItem>
              {isAuthenticated && post.user.username === username && (
                <MenuItem onClick={handleClose}>
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
          className={classes.plr1}
          startIcon={<ChatBubbleIcon />}
        >
          {post.reply_count}
        </Button>
        <Button
          className={classes.plr1}
          onClick={handleHeartClick}
          startIcon={<FavoriteIcon />}
          color={post.is_hearted ? "primary" : "secondary"}
        >
          {post.heart_count}
        </Button>
        <Button color="secondary" className={classes.plr1}>
          <RepeatIcon />
          {post.repost_count}
        </Button>
        <IconButton className={classes.mlAuto}>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostListItem;
