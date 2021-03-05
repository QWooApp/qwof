import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    mb2: {
      marginBottom: theme.spacing(2),
    },
    p0: {
      paddingTop: "0",
      paddingBottom: "0",
    },
    pt0: {
      paddingTop: theme.spacing(1),
    },
    mlAuto: {
      marginLeft: "auto",
    },
  })
);

export default useStyles;
