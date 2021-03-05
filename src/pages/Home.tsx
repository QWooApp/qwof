import "../styles/app.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { getPosts } from "../api/blog";
import PostList from "../components/PostList";
import { useToken } from "../store/auth/hooks";
import { setPosts } from "../store/blog/actions";
import HomeSideMenu from "../components/HomeSideMenu";
import CreatePostForm from "../components/CreatePostForm";

function Home() {
  const token = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home / QWoo";
  }, []);

  useEffect(() => {
    getPosts(token!)
      .then((posts) => dispatch(setPosts(posts)))
      .catch((e) => alert(e));
  }, [dispatch, token]);

  return (
    <Container>
      <br />
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <HomeSideMenu />
        </Grid>
        <Grid item md={6} xs={12}>
          <CreatePostForm />
          <PostList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
