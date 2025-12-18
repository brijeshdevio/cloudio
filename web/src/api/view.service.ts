import { http } from "./http";

export const ViewService = {
  getItems: async () => (await http.get("/items")).data,

  getItem: async (id: string) => (await http.get(`/folders/${id}`)).data,

  getRecent: async () => (await http.get(`/recent`)).data,

  getStars: async () => (await http.get(`/stars`)).data,

  getTrash: async () => (await http.get(`/trash`)).data,
};
