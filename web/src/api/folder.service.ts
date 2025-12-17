import type { FolderForm } from "@/types/folder";
import { http } from "./http";

export const FolderService = {
  create: async (formData: FolderForm) =>
    (await http.post("/folders", formData)).data,

  update: async (id: string, formData: { name: string }) =>
    (await http.put(`/folders/${id}`, formData)).data,

  trash: async (id: string) => (await http.patch(`/folders/${id}/trash`)).data,

  restore: async (id: string) =>
    (await http.patch(`/folders/${id}/restore`)).data,
};
