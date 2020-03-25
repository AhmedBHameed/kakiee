import React, { useCallback, useState } from "react";
import { IconButton } from "@material-ui/core";
import { NightsStay, WbSunny } from "@material-ui/icons";
import { storedThemeType } from "../../../@lib/services";

const ThemeSwitch: React.FC<{ onToggleTheme: () => void }> = ({
  onToggleTheme = () => {}
}) => {
  const [isLightTheme, setIsLightTheme] = useState(
    storedThemeType() === "light"
  );
  const themeTogle = useCallback(() => {
    onToggleTheme();
    setIsLightTheme(s => !s);
  }, [setIsLightTheme, onToggleTheme]);

  return (
    <IconButton onClick={themeTogle} aria-label="Menu">
      {isLightTheme ? (
        <WbSunny fontSize="large" />
      ) : (
        <NightsStay fontSize="large" />
      )}
    </IconButton>
  );
};

export default ThemeSwitch;
