import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((_) =>
  createStyles({
    thumbImg: {
      width: "auto",
      height: "100%",
      display: "block",
    },
    thumbInner: {
      minWidth: 0,
      display: "flex",
      overflow: "hidden",
    },
    thumbnailContainer: {
      marginTop: 16,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
    },
    thumbnail: {
      padding: 4,
      width: 100,
      height: 100,
      marginRight: 8,
      marginBottom: 8,
      borderRadius: 2,
      display: "inline-flex",
      boxSizing: "border-box",
      border: "1px solid #eaeaea",
    },
  })
);

export default useStyles;
