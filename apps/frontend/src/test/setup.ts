import '@testing-library/jest-dom/extend-expect';

// Mock MaterialUI icons since they often cause issues in tests
jest.mock('@mui/icons-material/Brightness4', () => ({
  __esModule: true,
  default: () => <div data-testid="Brightness4Icon" />
}));

jest.mock('@mui/icons-material/Brightness7', () => ({
  __esModule: true,
  default: () => <div data-testid="Brightness7Icon" />
}));

// Mock react-query devtools to avoid issues in tests
jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null
})); 