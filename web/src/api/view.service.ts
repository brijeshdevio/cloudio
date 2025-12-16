import { http } from "./http";

export const ViewService = {
  getItems: async () => (await http.get("/items")).data,

  getItem: async (id: string) => (await http.get(`/folders/${id}`)).data,
};
