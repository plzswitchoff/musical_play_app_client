import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";

function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export default useCreateComment;
