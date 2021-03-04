import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import useStyles from "./styles/Navigation";
import { logOut } from "../store/auth/actions";
import { useAuthenticated } from "../store/auth/hooks";

function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useAuthenticated();

  const handleLogout = () => {
    dispatch(logOut());
    history.push("/login");
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky">
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
            {isAuthenticated ? (
              <>
                <Button onClick={handleLogout} className={classes.navLink}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  to="/login"
                  component={RouterLink}
                  className={classes.navLink}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;
