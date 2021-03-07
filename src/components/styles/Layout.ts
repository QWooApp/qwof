import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      marginBottom: theme.spacing(2),
    },
    main: {
      marginBottom: theme.spacing(2),
    },
    fab: {
      margin: 0,
      right: 20,
      bottom: 20,
      top: "auto",
      left: "auto",
      position: "fixed",
      color: theme.palette.common.white,
    },
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    footer: {
      padding: theme.spacing(2, 2),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
  })
);

export default useStyles;
