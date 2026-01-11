import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "@/api/image";

function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
  });
}

export default useUploadImages;
