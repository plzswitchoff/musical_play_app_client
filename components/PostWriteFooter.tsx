import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
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
