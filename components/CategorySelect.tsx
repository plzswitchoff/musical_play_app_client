import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants";
import useGetCategories from "@/hooks/queries/useGetCategories";
import { Category } from "@/types";

function CategorySelect() {
  const { control } = useFormContext();
  const { showActionSheetWithOptions } = useActionSheet();
  const { data: categories = [] } = useGetCategories();

  const handlePress = (onChange: (value: number | null) => void) => {
    const options = [...categories?.data?.map((c: Category) => c.name), "취소"];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "카테고리 선택",
      },
      (selectedIndex) => {
        if (
          selectedIndex !== undefined &&
          selectedIndex !== cancelButtonIndex
        ) {
          onChange(categories["data"][selectedIndex].id);
        }
      },
    );
  };

  const getCategoryName = (categoryId: number | null) => {
    if (categoryId === null) return null;
    return categories.data?.find((c: Category) => c.id === categoryId)?.name;
  };

  return (
    <Controller
      name="categoryId"
      control={control}
      rules={{
        validate: (data: number | null) => {
          if (data === null) {
            return "카테고리를 선택해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Text style={styles.label}>카테고리</Text>
          <Pressable
            style={[styles.container, Boolean(error) && styles.inputError]}
            onPress={() => handlePress(onChange)}
          >
            <Text style={[styles.text, value === null && styles.placeholder]}>
              {getCategoryName(value) ?? "카테고리를 선택해주세요."}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.GRAY_500} />
          </Pressable>
          {Boolean(error) && <Text style={styles.error}>{error?.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.GRAY_100,
  },
  text: {
    fontSize: 16,
    color: colors.BLACK,
  },
  placeholder: {
    color: colors.GRAY_500,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
});

export default CategorySelect;
