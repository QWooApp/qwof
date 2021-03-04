import "../styles/separator.scss";

import { ReactNode } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles/AuthPage";
import GoogleButton from "../components/GoogleButton";

interface AuthPageProps {
  title: string;
  image: string;
  description: string;
  authProviderBtnText: string;
  AuthForm: NonNullable<ReactNode>;
}

function AuthPage(props: AuthPageProps) {
  const classes = useStyles();
  const { title, image, description, AuthForm } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography paragraph component="h1" variant="h4" color="primary">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </div>
        <Container maxWidth="sm">
          <GoogleButton />
          <div className="separator">OR</div>
          {AuthForm}
        </Container>
      </Grid>
    </Grid>
  );
}

export default AuthPage;
