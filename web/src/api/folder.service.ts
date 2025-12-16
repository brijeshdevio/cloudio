import { http } from "./http";

export const FolderService = {
  create: async (formData: any) => (await http.post("/folders", formData)).data,
};
