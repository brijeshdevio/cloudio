// ======== MODAL ============
export type ModalsType = {
  NewFolder: boolean;
  NewFile: boolean;
};

export type ModalContextType = {
  modals: ModalsType;
  modal: (key: keyof ModalsType, value: boolean) => void;
};

// ======== Auth ============
export type UserType = {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
};

export type AuthContextType = {
  user: null | UserType;
  loading: boolean;
  isAuthenticated: boolean;
};
