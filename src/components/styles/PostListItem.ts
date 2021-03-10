import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    mt2: {
      marginTop: theme.spacing(2),
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
    plr1: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  })
);

export default useStyles;
