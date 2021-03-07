import { useDispatch } from "react-redux";
import {
  Ref,
  lazy,
  Suspense,
  ReactNode,
  forwardRef,
  ReactElement,
} from "react";

import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PostAdd from "@material-ui/icons/PostAdd";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TransitionProps } from "@material-ui/core/transitions";

import useStyles from "./styles/Layout";
import CreatePostForm from "./CreatePostForm";
import { useDialogOpen } from "../store/blog/hooks";
import { toggleDialog } from "../store/blog/actions";
import { useAuthenticated } from "../store/auth/hooks";

const Navigation = lazy(() => import("./Navigation"));

interface LayoutProps {
  children: NonNullable<ReactNode>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Layout({ children }: LayoutProps) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const dialogOpen = useDialogOpen();
  const isAuthenticated = useAuthenticated();

  const handleDialogOpenClick = () => {
    dispatch(toggleDialog(true));
  };

  const handleDialogCloseClick = () => {
    dispatch(toggleDialog(false));
  };

  return (
    <div className={classes.root}>
      <Suspense fallback="">
        <Navigation />
      </Suspense>
      <main>{children}</main>
      {isAuthenticated && (
        <>
          <Fab
            color="primary"
            onClick={handleDialogOpenClick}
            className={classes.fab}
          >
            <PostAdd />
          </Fab>
          <Dialog
            fullScreen
            open={dialogOpen}
            onClose={handleDialogCloseClick}
            TransitionComponent={Transition}
            aria-labelledby="form-dialog-title"
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleDialogCloseClick}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography className="white" variant="h5">
                  Create Tweet
                </Typography>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <CreatePostForm elevation={0} />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleDialogCloseClick}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default Layout;
