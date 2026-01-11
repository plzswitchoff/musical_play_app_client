import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageUri, VoteOption } from "@/types";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import CustomButton from "@/components/CustomButton";
import useCreatePost from "@/hooks/queries/useCreatePost";
import PostWriteFooter from "@/components/PostWriteFooter";
import ImagePreviewList from "@/components/ImagePreviewList";
import VoteModal from "@/components/VoteModal";
import VoteAttached from "@/components/voteAttached";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  isVoteAttached: boolean;
  voteOptions: VoteOption[];
};

export default function PostWriteScreen() {
  const postMutation = useCreatePost();
  const navigation = useNavigation();
  const postForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
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
        <VoteAttached />
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
      <VoteModal />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
