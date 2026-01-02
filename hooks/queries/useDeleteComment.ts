import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
    },
  });
}

export default useDeleteComment;
