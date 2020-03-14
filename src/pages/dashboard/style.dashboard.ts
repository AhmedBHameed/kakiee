import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  contentContainer: {
    paddingTop: "4.5rem",
    position: "relative"
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
    cursor: "pointer",
    "&::after": {
      content: `""`,
      transform: "scaleX(0)",
      transition: "transform .5s",
      position: "absolute",
      height: 2,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.primary.main
    },
    "&:hover::after": {
      transform: "scaleX(1)"
    }
  },
  activeLink: {
    "&::after": {
      transform: "scaleX(1)"
    }
  }
}));
