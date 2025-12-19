import type { FileForm } from "@/types/file";
import { http } from "./http";

export const FileService = {
  upload: async (formData: FileForm) =>
    (
      await http.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data,

  getById: async (id: string) => (await http.get(`/files/${id}`)).data,

  update: async (id: string, formData: { newName: string }) =>
    (await http.put(`/files/${id}`, formData)).data,

  star: async (id: string) => (await http.patch(`/files/${id}/star`)).data,

  unstar: async (id: string) => (await http.patch(`/files/${id}/unstar`)).data,

  trash: async (id: string) => (await http.patch(`/files/${id}/trash`)).data,

  restore: async (id: string) =>
    (await http.patch(`/files/${id}/restore`)).data,
};
