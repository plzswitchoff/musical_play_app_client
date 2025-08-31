import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageUri } from "@/types";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import CustomButton from "@/components/CustomButton";
import useCreatePost from "@/hooks/queries/useCreatePost";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

export default function PostWriteScreen() {
  const postMutation = useCreatePost();
  const navigation = useNavigation();
  const postForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
    },
  });

  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
    postMutation.mutate({
      ...formValues,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
