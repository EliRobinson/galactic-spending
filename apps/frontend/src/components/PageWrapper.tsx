import { FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { messages as enMessages } from "../i18n/en-US";
import { Providers } from "./Providers";
import ImperialLogo from "../static/images/imperial.svg";
import RebelLogo from "../static/images/rebel.svg";
import { useTheme } from "../theme/ThemeContext";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

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
              <SvgIcon viewBox="0 0 600 600">
                <ImperialLogo fill={theme.palette.secondary.main} />
              </SvgIcon>
            ) : (
              <SvgIcon viewBox="0 0 300 300">
                <RebelLogo fill={theme.palette.primary.main} />
              </SvgIcon>
            )}
          </IconButton>
        </div>
        {children}
      </div>
    );
  };

  return (
    <Providers messages={enMessages} locale="en">
      <div className="min-h-screen p-2">{renderContent()}</div>
    </Providers>
  );
};
