import { lazy, useState, Suspense, ReactNode } from "react";

import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import PostAdd from "@material-ui/icons/PostAdd";
import DialogContent from "@material-ui/core/DialogContent";

import useStyles from "./styles/Layout";
import CreatePostForm from "./CreatePostForm";

const Navigation = lazy(() => import("./Navigation"));

interface LayoutProps {
  children: NonNullable<ReactNode>;
}

function Layout({ children }: LayoutProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Suspense fallback="">
        <Navigation />
      </Suspense>
      <main>{children}</main>
      <Fab color="primary" onClick={handleClickOpen} className={classes.fab}>
        <PostAdd />
      </Fab>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
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
