import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LinearProgress from "@material-ui/core/LinearProgress";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

import { getPosts } from "../api/blog";
import configureEndpoint from "../api/host";
import PostList from "../components/PostList";
import { setPosts } from "../store/blog/actions";
import { followUser, unFollowUser } from "../api/feed";
import { UserDetails, getUserDetails } from "../api/user";
import { useToken, useUsername, useAuthenticated } from "../store/auth/hooks";

const BASE_URL = configureEndpoint("user");

function Profile() {
  const token = useToken();
  const dispatch = useDispatch();
  const loggedInUsername = useUsername();
  const isAuthenticated = useAuthenticated();
  const [user, setUser] = useState<UserDetails>();
  const { username } = useParams<{ username: string }>();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails(username, token)
      .then(setUser)
      .catch(() => {
        setNotFound(true);
      });
  }, [token, username]);

  useEffect(() => {
    if (user)
      document.title = `${user.first_name} ${user.last_name} (@${user.username}) / QWoo`;
  }, [user]);

  useEffect(() => {
    if (isAuthenticated)
      getPosts(token!, `${BASE_URL}/posts/${username}/`).then((posts) =>
        dispatch(setPosts(posts))
      );
  }, [token, dispatch, username, isAuthenticated]);

  const handleFollowButton = async () => {
    if (user) {
      if (!user.is_following)
        followUser(token!, username).then(() => {
          setUser({ ...user, is_following: true });
        });
      else
        unFollowUser(token!, username).then(() => {
          setUser({ ...user, is_following: false });
        });
    }
  };

  if (notFound) return <Redirect to="/not-found" />;

  return (
    <Container>
      <br />
      {user ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                title={user.first_name}
                style={{ height: 310 }}
                image={
                  user.avatar
                    ? user.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  {user.first_name} {user.last_name}
                  <Link
                    component={RouterLink}
                    style={{ marginLeft: "10px", fontSize: "80%" }}
                    to={`/user/${user.username}`}
                  >
                    @{user.username}
                  </Link>
                </Typography>
                <Typography gutterBottom>{user.bio}</Typography>
              </CardContent>
              <CardActions style={{ paddingLeft: "25px" }}>
                <PermContactCalendarIcon />
                &nbsp; Joined {user.date_joined}
              </CardActions>
              <Divider />
              <CardActions>
                {isAuthenticated ? (
                  loggedInUsername !== username ? (
                    <>
                      <Button
                        className="white"
                        variant="contained"
                        onClick={handleFollowButton}
                        color={!user.is_following ? "primary" : "secondary"}
                      >
                        {!user.is_following ? (
                          <>
                            <PersonAddIcon style={{ marginRight: "6" }} />
                            FOLLOW
                          </>
                        ) : user.follow_requested ? (
                          ""
                        ) : (
                          <>
                            <PersonAddDisabledIcon
                              style={{ marginRight: "6" }}
                            />
                            UNFOLLOW
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton style={{ marginLeft: "auto" }}>
                        <Edit />
                      </IconButton>
                    </>
                  )
                ) : (
                  <Typography align="center">
                    Log in to follow {user.username}'s posts.
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <PostList />
          </Grid>
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </Container>
  );
}

export default Profile;
