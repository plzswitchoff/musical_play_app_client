import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { createPost } from "@/api/post";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => router.replace("/"),
  });
}

export default useCreatePost;
