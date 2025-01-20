import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B71C1C', // Rebel Alliance Red
      light: '#F05545',
      dark: '#7F0000',
    },
    secondary: {
      main: '#FFB74D', // Rebel Alliance Gold
      light: '#FFE97D',
      dark: '#C88719',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121', // Empire Dark Gray
      light: '#484848',
      dark: '#000000',
    },
    secondary: {
      main: '#B71C1C', // Empire Red
      light: '#F05545',
      dark: '#7F0000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
}); 