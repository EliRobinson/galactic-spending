import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import _ from "lodash";
import { lightTheme, darkTheme } from "./theme";
import {
  Theme,
  useTheme as useMuiTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
  lightTheme: Theme;
  darkTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </CssVarsProvider>
  );
};

const ThemeProviderInner = ({ children }: { children: ReactNode }) => {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const muiTheme = useMuiTheme();

  if (!mode) {
    return null;
  }

  const toggleTheme = () => {
    const newMode = !isDarkMode;

    setIsDarkMode(newMode);
    setMode(newMode ? "dark" : "light");
  };

  const combinedTheme = useMemo(() => {
    return _.merge({}, muiTheme, theme);
  }, [mode, isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        theme: combinedTheme,
        lightTheme,
        darkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
