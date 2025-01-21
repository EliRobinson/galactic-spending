import { FormattedMessage, useIntl } from "react-intl";
import { ReactNode } from "react";
import { SvgIcon, Switch, Stack, Typography } from "@mui/material";
import { messages as enMessages } from "../i18n/en-US";
import { Providers } from "./Providers";
import ImperialLogo from "../static/images/imperial.svg";
import RebelLogo from "../static/images/rebel.svg";
import { useTheme } from "../theme/ThemeContext";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Providers messages={enMessages} locale="en">
      <PageWrapperInner>{children}</PageWrapperInner>
    </Providers>
  );
};

const PageWrapperInner = ({ children }: { children: ReactNode }) => {
  const { isDarkMode, toggleTheme, theme, darkTheme, lightTheme } = useTheme();
  const intl = useIntl();

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">
          <FormattedMessage id="app.title" />
        </h1>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack alignItems="center">
            <SvgIcon viewBox="0 0 300 300" sx={{ fontSize: 20 }}>
              <RebelLogo fill={theme.palette.primary.main} />
            </SvgIcon>
            <Typography variant="caption">
              <FormattedMessage id="theme.rebel" />
            </Typography>
          </Stack>

          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            inputProps={{
              "aria-label": intl.formatMessage({ id: "theme.toggle" }),
            }}
          />

          <Stack alignItems="center">
            <SvgIcon viewBox="0 0 600 600" sx={{ fontSize: 20 }}>
              <ImperialLogo
                fill={
                  isDarkMode
                    ? darkTheme.palette.secondary.main
                    : darkTheme.palette.primary.main
                }
              />
            </SvgIcon>
            <Typography variant="caption">
              <FormattedMessage id="theme.imperial" />
            </Typography>
          </Stack>
        </Stack>
      </div>
      {children}
    </div>
  );
};
