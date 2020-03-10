import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  shiftLeft: {
    paddingLeft: "4rem"
  },
  circulProgressColor: {
    color: "#fff",
    marginLeft: theme.spacing(5)
  },
  errorColor: {
    color: "#f44336"
  },
  "ce-block__content": {
    margin: "0"
  }
}));
