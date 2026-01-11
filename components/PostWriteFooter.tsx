import { Alert, Pressable, StyleSheet, View } from "react-native";
import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { getFormDataImages } from "@/utils/image";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { useFormContext, useWatch } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function PostWriteFooter() {
  const uploadImage = useUploadImages();
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 개수 초과", "이미지는 5개 이하로 첨부해주세요.");
      return;
    }

    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri }))]);
  };

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
      return;
    }

    const formData = getFormDataImages("images", result.assets);
    uploadImage.mutate(formData, {
      onSuccess: (data: string[]) => addImageUris(data),
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
      </Pressable>
      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue("isVoteOpen", true)}
      >
        <MaterialCommunityIcons
          name="vote"
          size={20}
          color={colors.BLACK}
        ></MaterialCommunityIcons>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});
export default PostWriteFooter;
