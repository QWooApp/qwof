import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    gButton: {
      width: "100%",
      padding: "0px",
      fontWeight: 500,
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "2px",
      alignItems: "center",
      display: "inline-flex",
      justifyContent: "center",
      color: "rgba(0, 0, 0, 0.54)",
      border: "1px solid transparent",
      fontFamily: "Roboto, sans-serif",
      backgroundColor: "rgb(255, 255, 255)",
      boxShadow:
        "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
    },
    gInnerButton: {
      padding: "10px",
      borderRadius: "2px",
      marginRight: "10px",
      background: "rgb(255, 255, 255)",
    },
  })
);

export default useStyles;
