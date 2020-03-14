// Material design
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) => ({
  fullScreen: {
    height: "100%",
    width: "100%"
  },
  backgroundColor: {
    backgroundColor: theme.palette.background.default
  }
}));
