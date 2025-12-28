import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/api/post";
import { queryKeys } from "../../constants";
import queryClient from "../../api/queryClient";

function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useDeletePost;
