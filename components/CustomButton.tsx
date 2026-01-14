import { colors } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  // *** 추가
  variant?: "standard" | "filled" | "outlined";
  style?: StyleProp<ViewStyle>;
}

function CustomButton({
  label,
  size = "large",
  variant = "filled",
  // *** 추가
  style = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        props.disabled && styles.disabled,
        pressed && styles.pressed,
        // *** 추가
        style,
      ]}
      {...props}
    >
      <Text style={styles[`${variant}Text`]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  // *** 추가
  medium: {
    height: 38,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
  },
  standard: {},
  // *** 추가
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
  standardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  filledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  // *** 추가
  outlinedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
});

export default CustomButton;
