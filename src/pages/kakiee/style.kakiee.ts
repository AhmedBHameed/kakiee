import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  spacingTop: {
    paddingTop: "4.5rem"
  },
  container: {
    overflow: "hidden",
    position: "relative"
  },
  aside: {
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
    position: "fixed",
    transition: "left .5s",
    left: "-100%",
    top: 0,
    bottom: 0,
    width: "30%",
    display: "block",
    zIndex: 1001,
    [theme.breakpoints.up("md")]: {
      left: 0
    },
    [theme.breakpoints.up("lg")]: {
      width: "20%"
    }
  },
  navMargin: {
    marginTop: 100
  },
  asideOpen: {
    left: 0,
    width: 300
  },
  main: {
    width: "100%",
    transition: "left .6s",
    position: "relative",
    top: 0,
    left: 0,
    // float: "right",
    [theme.breakpoints.up("md")]: {
      left: "30%",
      width: "70%"
    },
    [theme.breakpoints.up("lg")]: {
      left: "20%",
      width: `calc(100% - 20%)`
    }
  },
  mainShrink: {
    left: 300,
    width: "100%"
  },
  burggerMenu: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1004
  },
  bold: {
    fontWeight: 500
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& > li": {
      marginTop: theme.spacing(3)
    }
  },
  links: {
    position: "relative",
    color: "inherit",
    textDecoration: "none",
    letterSpacing: 1,
    fontWeight: 500,
    "&::after": {
      content: `""`,
      transform: "scaleX(0)",
      transition: "transform .5s",
      position: "absolute",
      height: 2,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.secondary.main
    },
    "&:hover::after": {
      transform: "scaleX(1)"
    }
  },
  activeLink: {
    "&::after": {
      transform: "scaleX(1)"
    }
  },
  iconLinks: {
    color: "inherit",
    textDecoration: "none",
    fontSize: 0
  },
  copyRights: {
    position: "absolute",
    bottom: "3rem",
    left: "50%",
    transform: "translateX(-50%)"
  },
  nameColor: {
    color: theme.palette.secondary.main
  },
  heartColor: {
    color: "red",
    width: 15,
    height: 15,
    display: "inline"
  }
}));
