import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { FailToggleProvider } from "./providers/FailToggleProvider.tsx";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <BrowserRouter>
        <FailToggleProvider>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider autoHideDuration={3000}>
              <App />
            </SnackbarProvider>
          </QueryClientProvider>
        </FailToggleProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>,
);
