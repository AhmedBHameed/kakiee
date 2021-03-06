// Material design
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) => ({
  fullScreen: {
    // position: "absolute",
    width: "100%",
    height: "100%"
  },
  backgroundColor: {
    backgroundColor: theme.palette.background.default,
    position: "absolute"
  }
}));
