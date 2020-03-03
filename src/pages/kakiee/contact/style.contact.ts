import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  infoContainer: {
    background: "lightgray",
    overflow: "hidden",
    padding: `4.5rem ${theme.spacing(3)}px`,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left"
  },
  itemsSpacing: {
    padding: theme.spacing(1)
  },
  serviceCaptionTxt: {
    justifyContent: "center"
  },
  serviceColorTxt: {
    color: theme.palette.secondary.main
  },
  ahmedSvg: {
    transform: "translateX(100%)",
    width: 300,
    padding: `4.5rem ${theme.spacing(3)}px 0`,
    paddingBottom: 0,
    marginBottom: -4
  },
  welcome: {
    fontWeight: 500,
    position: "absolute",
    fontStyle: "italic",
    fontFamily: `'Fredericka the Great', cursive`,
    transform: "translateX(-50%)"
  },
  hi: {
    top: "40%",
    left: "40%"
  },
  myName: {
    top: "50%",
    left: "50%"
  },
  errorColor: {
    color: "#f44336"
  },
  label: {
    left: "unset"
  },
  halfWidth: {
    width: "50%"
  },
  overflowHidden: {
    overflow: "hidden"
  },
  alignContent: {
    alignSelf: "self-start"
  },
  circulProgressColor: {
    color: "#fff",
    marginLeft: theme.spacing(5)
  }
}));
