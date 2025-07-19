import axiosInstance from "@/api/axios";
import { CreatePostDto } from "@/types";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);
  return data;
}

export { createPost };
