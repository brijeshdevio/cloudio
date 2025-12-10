// ======== MODAL ============
export type ModalsType = {
  NewFolder: boolean;
  NewFile: boolean;
};

export type ModalContextType = {
  modals: ModalsType;
  modal: (
    key: keyof ModalsType,
    value: boolean
  ) => void;
};
