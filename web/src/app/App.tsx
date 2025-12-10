import { AppRoutes } from "./routes/AppRoutes";
import { ModalProvider } from "./providers";
import { Modals } from "@/components";
import "./App.css";

export function App() {
  return (
    <>
      <ModalProvider>
        <AppRoutes />
        <Modals />
      </ModalProvider>
    </>
  );
}
