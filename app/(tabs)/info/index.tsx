import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function InfoScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>극장정보</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});
