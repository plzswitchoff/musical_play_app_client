import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/api/post";
import { queryKeys } from "../../constants";
import queryClient from "../../api/queryClient";

function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useUpdatePost;
