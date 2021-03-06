import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  circulProgressColor: {
    color: "#fff",
    marginLeft: theme.spacing(5)
  },
  errorColor: {
    color: "#f44336"
  },
  "ce-block__content": {
    margin: "0"
  },
  whiteTxt: {
    color:
      theme.palette.type === "light"
        ? theme.palette.common.black
        : theme.palette.common.white
  }
}));
