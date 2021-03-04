import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(1),
      color: theme.palette.common.white,
    },
    flexGrow: {
      flexGrow: 1,
    },
    title: {
      textDecoration: "none",
      color: theme.palette.common.white,
      fontFamily: "'Indie Flower', cursive !important",
    },
    navLink: {
      color: theme.palette.common.white,
    },
  })
);

export default useStyles;
