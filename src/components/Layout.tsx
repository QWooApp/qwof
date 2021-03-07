import { lazy, Suspense, ReactNode } from "react";
import { useDispatch } from "react-redux";

import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import PostAdd from "@material-ui/icons/PostAdd";
import DialogContent from "@material-ui/core/DialogContent";

import useStyles from "./styles/Layout";
import CreatePostForm from "./CreatePostForm";
import { useDialogOpen } from "../store/blog/hooks";
import { toggleDialog } from "../store/blog/actions";

const Navigation = lazy(() => import("./Navigation"));

interface LayoutProps {
  children: NonNullable<ReactNode>;
}

function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialogOpen = useDialogOpen();

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
      <Fab
        color="primary"
        onClick={handleDialogOpenClick}
        className={classes.fab}
      >
        <PostAdd />
      </Fab>
      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={handleDialogCloseClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ marginTop: "0" }}>
          <CreatePostForm elevation={0} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Layout;
