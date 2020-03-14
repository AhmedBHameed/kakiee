// Material design
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  errorColor: {
    color: theme.palette.error[500] || "#f44336"
  },
  label: {
    left: "unset"
  }
}));
