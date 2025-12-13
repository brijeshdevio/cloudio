import type { CreateFolderType } from "@/types";
import { axiosClient } from "./axiosClient";

export const createFolder = async (data: CreateFolderType) =>
  (await axiosClient.post("/folders", data)).data;

export const getFolders = async () => (await axiosClient.get("/folders")).data;

export const getFolder = async (ID: string) =>
  (await axiosClient.get(`/folders/${ID}`)).data;
