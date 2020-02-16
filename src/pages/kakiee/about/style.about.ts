import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  container: {
    background: "lightgray",
    overflow: "hidden",
    position: "relative"
  },
  subtitleColor: {
    color: "gray"
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
    opacity: 0
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
