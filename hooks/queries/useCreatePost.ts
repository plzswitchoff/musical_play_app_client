import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { createPost } from "@/api/post";
import { queryKeys } from "../../constants";
import queryClient from "../../api/queryClient";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useCreatePost;
