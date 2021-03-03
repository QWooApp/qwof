import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(1),
      color: theme.palette.common.white,
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: theme.palette.common.white,
    },
  })
);

function Navigation() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              edge="start"
              color="default"
              aria-label="menu"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              to="/"
              variant="h5"
              component={Link}
              className={classes.title}
            >
              <b>QWoo</b>
            </Typography>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;
