import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  asideSpacing: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  initialMovement: {
    transform: "translateX(-40px)",
    opacity: 0
  }
}));
