import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>커뮤니티 화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
