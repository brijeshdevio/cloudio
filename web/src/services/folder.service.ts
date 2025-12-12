import type { CreateFolderType } from "@/types";
import { axiosClient } from "./axiosClient";

export const createFolder = async (data: CreateFolderType) =>
  (await axiosClient.post("/folders", data)).data;
