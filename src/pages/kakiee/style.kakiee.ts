import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  iconLinks: {
    color: "inherit",
    textDecoration: "none",
    fontSize: 0
  },
  copyRights: {
    position: "absolute",
    bottom: "3rem",
    left: "50%",
    transform: "translateX(-50%)"
  },
  nameColor: {
    color: theme.palette.secondary.main
  },
  heartColor: {
    color: "red",
    width: 15,
    height: 15,
    display: "inline"
  }
}));
