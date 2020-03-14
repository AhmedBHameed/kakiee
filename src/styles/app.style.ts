import {
  makeStyles,
  createMuiTheme,
  ThemeOptions
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";

const themeOption: ThemeOptions = {
  palette: {
    type: "light",
    background: {
      default: "#fafafa"
    },
    primary: grey,
    secondary: {
      main: "#228896"
    },
    text: {
      primary: "#000",
      secondary: grey["600"]
    },
    error: red
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
    primary: blueGrey,
    secondary: teal,
    text: {
      primary: "#fff",
      secondary: grey["400"]
    }
  }
});

export const useAppStyle = makeStyles(theme => {
  const isLight = theme.palette.type === "light";
  return {
    noSpacing: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    },
    fieldsBackground: {
      backgroundColor: isLight
        ? theme.palette.primary["200"]
        : theme.palette.primary["500"]
    },
    fieldsLabelColor: {
      color: `${
        isLight ? theme.palette.secondary["200"] : theme.palette.common.white
      } !important`
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
  };
});
