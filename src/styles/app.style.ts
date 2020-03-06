import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const MimTheme = createMuiTheme({
  palette: {
    // primary: {
    //   main: "#000"
    // },
    secondary: {
      main: "#228896"
    }
  }
});

export const useAppStyle = makeStyles(theme => ({
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
  sectionSpacingTop: {
    marginTop: 40
  },
  sectionSpacingAside: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  burgerSpace: {
    paddingTop: "4.5rem"
  },
  grayColor: {
    color: "gray"
  }
}));
