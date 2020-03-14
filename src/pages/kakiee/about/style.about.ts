import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  container: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary["800"]
        : theme.palette.primary["400"],
    overflow: "hidden",
    position: "relative"
  },
  ahmedSvg: {
    transform: "translateX(100%)",
    width: 300,
    padding: `4.5rem ${theme.spacing(3)}px 0`,
    paddingBottom: 0,
    marginBottom: -4,
    opacity: 0,
    [theme.breakpoints.down("md")]: {
      visibility: "hidden"
    }
  },
  captions: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontStyle: "italic",
    transform: "translate(-70%, -50%)",
    fontWeight: "bold",
    opacity: 0,
    color: theme.palette.text.primary
  },
  titleColor: {
    color: theme.palette.text.primary
  },
  subtitleColor: {
    color: theme.palette.text.secondary
  },
  hi: {
    fontFamily: `'Fredericka the Great', cursive`,
    textAlign: "left",
    marginBottom: 0
  },
  myName: {
    // marginLeft: "2rem",
    textAlign: "center",
    fontFamily: `'Fredericka the Great', cursive`,
    marginBottom: 0,
    whiteSpace: "nowrap",
    padding: `0 ${theme.spacing(5)}px`
  },
  founder: {
    // marginLeft: "4rem",
    textAlign: "right",
    fontFamily: `'Fredericka the Great', cursive`,
    marginBottom: 0
  },
  sectionOpt: {
    marginBottom: "2rem",
    letterSpacing: 2
  },
  contactMe: {
    textDecoration: "none"
  }
}));
