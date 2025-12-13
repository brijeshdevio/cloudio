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

// ============= Auth FORM ============
export interface SignupType {
  name: string;
  email: string;
  password: string;
}

export type LoginType = Omit<SignupType, "name">;

// ============ Folder Types ===========
export type CreateFolderType = {
  name: string;
  parent?: string;
};

export type BreadcrumbType = {
  _id: string;
  name: string;
  path: [
    {
      _id: string;
      name: string;
    }
  ];
};

export type DriveTableProps = {
  _id: string;
  name: string;
  size?: string;
  updatedAt: string;
};

export type UploadFileType = {
  file: File;
  folder?: string;
};
