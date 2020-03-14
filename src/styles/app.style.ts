import {
  makeStyles,
  createMuiTheme,
  ThemeOptions
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";

const themeOption: ThemeOptions = {
  palette: {
    type: "light",
    background: {
      default: "#fafafa"
    },
    primary: {
      ...grey
    },
    secondary: {
      main: "#228896"
    },
    text: {
      primary: "#000",
      secondary: grey["600"]
    }
  }
};

export const MimTheme = createMuiTheme(themeOption);
export const DarkTheme = createMuiTheme({
  ...themeOption,
  palette: {
    ...themeOption.palette,
    type: "dark",
    background: {
      default: blueGrey["900"]
    },
    primary: {
      ...blueGrey
    },
    secondary: {
      main: teal["300"] // Color of the navigation underline
    },
    text: {
      primary: "#fff",
      secondary: grey["400"]
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
