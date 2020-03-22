import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(theme => {
  const spacing = 3;
  return {
    container: {
      position: "relative",
      width: 150,
      height: 100,
      border: "1px solid white",
      borderRadius: 10
    },
    innerContent: {
      overflow: "hidden",
      position: "absolute",
      top: spacing,
      left: spacing,
      bottom: spacing,
      right: spacing,
      borderRadius: 7,
      background: "rgba(255,255,255,0.25)"
    },
    fileInput: {
      opacity: 0,
      position: "absolute",
      width: 35,
      height: 35,
      zIndex: 2,
      cursor: "pointer"
    },
    icon: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    },
    progress: {
      width: "100%",
      position: "absolute",
      left: 0,
      bottom: 0,
      height: 3
    }
  };
});
