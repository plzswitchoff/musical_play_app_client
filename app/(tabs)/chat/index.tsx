import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>채팅</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});

// <ion-icon name="chatbubbles-outline"></ion-icon>
