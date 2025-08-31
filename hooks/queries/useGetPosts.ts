import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/post";

function useGetPosts() {
  const { data, isSuccess, isError } = useQuery({
    queryFn: ({ pageParam }: { pageParam: number }) => getPosts(pageParam),
    queryKey: ["post", "getPosts"],
  });

  return { data };
}

export default useGetPosts;
