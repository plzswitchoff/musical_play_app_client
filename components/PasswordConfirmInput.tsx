import React from "react";
import InputField from "@/components/InputField";
import { Controller, useFormContext } from "react-hook-form";

function PasswordConfirmInput() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data || data.length === 0) {
            return "비밀번호를 입력해주세요.";
          }

          if (data.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
          }
          const regPassword = /^[\da-zA-Z!@#]{8,}$/;
          if (!regPassword.test(data)) {
            return "올바른 비밀번호 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          onChangeText={onChange}
          value={value}
          error={error?.message}
          submitBehavior="submit"
          returnKeyType="done"
          secureTextEntry
        />
      )}
      name="passwordConfirm"
    />
  );
}

export default PasswordConfirmInput;
