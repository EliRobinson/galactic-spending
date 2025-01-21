import { FormattedMessage, useIntl } from "react-intl";
import { ReactNode } from "react";
import { SvgIcon, Switch, Stack, Typography } from "@mui/material";
import { Providers } from "./Providers";
import ImperialLogo from "../static/images/imperial.svg";
import RebelLogo from "../static/images/rebel.svg";
import { useTheme } from "../theme/ThemeContext";
import { useLanguage } from "../i18n/LanguageContext";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const { currentMessages, currentLocale } = useLanguage();
  return (
    <Providers messages={currentMessages} locale={currentLocale}>
      <PageWrapperInner>{children}</PageWrapperInner>
    </Providers>
  );
};

const PageWrapperInner = ({ children }: { children: ReactNode }) => {
  const { isDarkMode, toggleTheme, theme, darkTheme, lightTheme } = useTheme();
  const { isWookiee, toggleLanguage } = useLanguage();
  const intl = useIntl();

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">
          <FormattedMessage id="app.title" />
        </h1>
        <Stack spacing={2} alignItems="center">
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
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption">EN</Typography>
              <Switch
                checked={isWookiee}
                onChange={toggleLanguage}
                inputProps={{
                  "aria-label": "Toggle Wookiee language",
                }}
              />
              <Typography variant="caption">Wookiee</Typography>
            </Stack>
          </Stack>
        </Stack>
      </div>
      {children}
    </div>
  );
};
