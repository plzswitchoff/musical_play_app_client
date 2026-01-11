// imagePicker에서 이미지를 받아서 FormData로 바꿔줌
import * as ImagePicker from "expo-image-picker";

function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[],
) {
  const formData = new FormData();

  images.forEach(({ uri, mimeType = "image/jpeg" }) => {
    const file = {
      uri,
      type: mimeType,
      name: uri.split("/").pop(),
    };

    formData.append(key, file as unknown as File);
  });

  return formData;
}

export { getFormDataImages };
