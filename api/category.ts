import { Category } from "@/types";
import axiosInstance from "./axios";

async function getCategories() {
  const { data } = await axiosInstance.get("post-categories");
  return data;
}

export { getCategories };
