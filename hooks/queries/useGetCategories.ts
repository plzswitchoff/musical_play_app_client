import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";

function useGetCategories() {
  return useQuery({
    queryFn: getCategories,
    queryKey: [queryKeys.CATEGORY, queryKeys.GET_CATEGORIES],
  });
}

export default useGetCategories;
