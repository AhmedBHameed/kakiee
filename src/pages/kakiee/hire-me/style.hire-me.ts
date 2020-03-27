import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => {
  const isLightTheme = theme.palette.type === "light";

  return {
    root: {
      color: theme.palette.text.primary,
      minHeight: "100%"
    },
    alignCenter: {
      width: "65%",
      margin: "0 auto"
    },
    container: {
      backgroundColor: isLightTheme
        ? theme.palette.primary["400"]
        : theme.palette.primary["800"]
    },
    planTitle: {
      fontFamily: `'Fredericka the Great', cursive`,
      textAlign: "left",
      opacity: 0,
      transform: "translate(50%, 0px)"
    },
    svgContainer: {
      width: "100%",
      margin: "0 auto",
      transform: "translate(-15%, 0px)",
      opacity: 0,
      [theme.breakpoints.up("md")]: {
        width: "90%"
      },
      [theme.breakpoints.up("lg")]: {
        width: "80%"
      },
      "& path[class='cloud']": {
        fill: isLightTheme
          ? theme.palette.primary["200"]
          : theme.palette.primary["500"]
      },
      "& rect": {
        opacity: 0
      }
    },
    serviceContainer: {
      justifyContent: "flex-start"
    },
    serviceBodyTxtClass: {
      alignSelf: "flex-end"
    },
    contactMe: {
      textDecoration: "none"
    }
  };
});
