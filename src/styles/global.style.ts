import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const MimTheme = createMuiTheme({
  palette: {
    // primary: {
    //   main: "#000"
    // },
    // secondary: {
    //   main: "#6AFF0F"
    // }
  }
});

export const useGlobalStyle = makeStyles(theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      borderRadius: 50
    }
  },
  noSpacing: {
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },
  btn: {
    color: "#FFF"
  },
  btnHover: {
    cursor: "pointer"
  },
  actionBtn: {
    color: "black",
    background: theme.palette.secondary.main
  },
  fullHight: {
    height: "100%"
  }
}));
