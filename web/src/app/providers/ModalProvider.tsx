import { createContext, useContext, useState } from "react";
import type { ModalContextType, ModalsType } from "@/types";

const initialState: ModalContextType = {
  modal: () => {},
  modals: {
    NewFolder: false,
    NewFile: false,
    RenameFolder: false,
  },
};

const ModalContext = createContext<ModalContextType>(initialState);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalsType>(initialState.modals);

  const modal = (name: keyof ModalsType, isActive: boolean) => {
    setModals((prev) => ({
      ...prev,
      [name]: isActive,
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, modal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
