import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";

function useGetPost(id: number) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
  });
}

export { useGetPost };
