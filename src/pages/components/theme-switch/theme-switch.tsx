import React, { useCallback } from "react";
import { IconButton, useTheme } from "@material-ui/core";
import { NightsStay, WbSunny } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { changeAppTheme } from "../../../@lib/store/kakiee/actions";

const ThemeSwitch: React.FC<any> = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeTogle = useCallback(() => {
    const currentTheme = theme.palette.type === "light" ? "dark" : "light";
    dispatch(changeAppTheme(currentTheme));
  }, [dispatch, theme.palette.type]);

  return (
    <IconButton onClick={() => themeTogle()} aria-label="Menu">
      {theme.palette.type === "light" ? (
        <NightsStay fontSize="large" />
      ) : (
        <WbSunny fontSize="large" />
      )}
    </IconButton>
  );
};

export default ThemeSwitch;
