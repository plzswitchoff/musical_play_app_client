import React from "react";
import InputField from "@/components/InputField";
import { Controller, useFormContext } from "react-hook-form";

function NicknameInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data || data.length === 0) {
            return "닉네임을 입력해주세요.";
          }

          if (data.length <= 2 || data.length >= 10) {
            return "닉네임은 2글자 이상, 10글자 이하로 입력해주세요.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          onChangeText={onChange}
          value={value}
          error={error?.message}
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="text"
          onSubmitEditing={() => setFocus("phone")}
        />
      )}
      name="nickname"
    />
  );
}

export default NicknameInput;
