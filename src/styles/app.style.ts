import { makeStyles } from "@material-ui/core/styles";

export const useAppStyle = makeStyles(theme => {
  const isLight = theme.palette.type === "light";
  return {
    noSpacing: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    },
    fieldsBackground: {
      borderRadius: 4,
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
