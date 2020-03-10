import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  mediaContaner: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    // height: 273,
    overflow: "hidden"
  },
  media: {
    // height: "100%",
    width: "100%",
    transform: "scale(1.2)",
    transition: ".9s ease-out",
    "&:hover": {
      transform: "scale(1)"
    }
  },
  cardMargin: {
    margin: 10
  }
});
