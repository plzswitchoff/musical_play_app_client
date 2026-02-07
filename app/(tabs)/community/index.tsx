import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CommunityScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>커뮤니티</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});
