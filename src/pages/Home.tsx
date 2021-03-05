import "../styles/app.scss";

import { useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import HomeSideMenu from "../components/HomeSideMenu";
import CreatePostForm from "../components/CreatePostForm";

function Home() {
  useEffect(() => {
    document.title = "Home / QWoo";
  }, []);

  return (
    <Container>
      <br />
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <HomeSideMenu />
        </Grid>
        <Grid item md={6} xs={12}>
          <CreatePostForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
