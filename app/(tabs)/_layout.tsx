import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="exchange"
        options={{
          title: "교환",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialCommunityIcons name="message" size={24} color="black" />
            ) : (
              <Feather name="message-square" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesome5 name="user-friends" size={24} color={color} />
            ) : (
              <Feather name="users" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "설정",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="settings" size={24} color="black" />
            ) : (
              <AntDesign name="setting" size={24} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
