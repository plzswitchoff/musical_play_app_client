import { SafeAreaView, StyleSheet, Text } from "react-native";
import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import AuthRoute from "@/components/AuthRoute";

export default function SettingScreen() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <Text onPress={logout}>설정 스크린</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
