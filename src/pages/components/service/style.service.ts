import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => ({
  serviceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start"
    }
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContent: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary["700"]
        : theme.palette.primary["300"],
    borderRadius: "50%",
    width: 100,
    height: 100,
    position: "relative"
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.palette.secondary.main,
    fontSize: 55
  },
  captions: {
    color: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    marginLeft: theme.spacing(2)
  },
  title: {
    marginBottom: 20,
    letterSpacing: 2,
    color: theme.palette.text.primary
  },
  subtitleColor: {
    color: theme.palette.text.secondary
  }
}));
