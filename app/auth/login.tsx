import FixedBottomCTA from "@/components/FixedBottomCTA";
import { StyleSheet, View } from "react-native";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "@/hooks/queries/useAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formValues: FormValues) => {
    console.log("formValues", formValues);
    loginMutation.mutate({ ...formValues });
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
