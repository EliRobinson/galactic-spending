import { useState } from "react";
import { lightTheme, darkTheme } from "../theme/theme";
import { messages as enMessages } from "../i18n/en-US";
import { IconButton } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import { Providers } from "./Providers";
import { useTheme } from "@mui/material";
import ImperialLogo from "../static/images/imperial.svg";
import RebelLogo from "../static/images/rebel.svg";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const muiTheme = useTheme();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    return (
      <div className="min-h-screen p-2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">
            <FormattedMessage id="app.title" />
          </h1>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label={isDarkMode ? "Empire Icon" : "Rebel Alliance Icon"}
            sx={{ padding: "8px" }}
          >
            {isDarkMode ? (
              <ImperialLogo />
            ) : (
              <RebelLogo />
            )}
          </IconButton>
        </div>
        {children}
      </div>
    );
  };

  return (
    <Providers messages={enMessages} locale="en" theme={theme}>
      <div className="min-h-screen p-2">{renderContent()}</div>
    </Providers>
  );
};
