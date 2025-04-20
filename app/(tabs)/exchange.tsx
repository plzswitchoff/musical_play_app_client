import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ExchangeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>거래 화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
