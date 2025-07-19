import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import { router } from "expo-router";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
    },
  });
}

export default useCreatePost;
