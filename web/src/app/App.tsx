import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider, ModalProvider } from "./providers";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <ModalProvider>
        <AuthProvider>
          <QueryClientProvider client={new QueryClient()}>
            <AppRoutes />
          </QueryClientProvider>
        </AuthProvider>
      </ModalProvider>
      <Toaster />
    </>
  );
}
