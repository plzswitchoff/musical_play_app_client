import axiosInstance from "@/api/axios";
import { CreatePostDto } from "@/types";
import { getSecureStore } from "@/utils/secureStore";

async function createPost(body: CreatePostDto) {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.post("/posts", body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

async function getPosts(page = 1) {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

export { createPost, getPosts };
