import { CircularProgress } from "@mui/material";

export const LoadingSpinner: React.FC = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="flex justify-center items-center min-h-screen"
    >
      <CircularProgress />
    </div>
  );
};
