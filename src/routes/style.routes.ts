import { makeStyles } from "@material-ui/core/styles";
import { MimTheme, DarkTheme } from "../styles/app.style";

export const useStyle = makeStyles(theme => ({
  backgroundLightColor: {
    backgroundColor: MimTheme.palette.background.default
  },
  backgroundDarkColor: {
    backgroundColor: DarkTheme.palette.background.default
  }
}));
