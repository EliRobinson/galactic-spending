import { useState } from "react";
import { lightTheme, darkTheme } from "../theme/theme";
import { messages as enMessages } from "../i18n/en-US";
import { IconButton } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ReactNode } from "react";
import { Providers } from "./providers";
export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    return (
      <div className="min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            <FormattedMessage id="app.title" />
          </h1>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
        {children}
      </div>
    );
  };

  return (
    <Providers messages={enMessages} locale="en" theme={theme}>
      <div className="min-h-screen p-8">{renderContent()}</div>
    </Providers>
  );
};
