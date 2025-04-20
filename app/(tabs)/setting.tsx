import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>설정 화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
