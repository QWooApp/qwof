import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import useStyles from "./styles/Navigation";

function Navigation() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              to="/"
              variant="h4"
              component={RouterLink}
              className={classes.title}
            >
              <b>qwoo</b>
            </Typography>
            <div className={classes.flexGrow} />
            <Button
              to="/login"
              component={RouterLink}
              className={classes.navLink}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;
