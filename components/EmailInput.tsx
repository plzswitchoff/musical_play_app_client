import React from "react";
import InputField from "@/components/InputField";
import { Controller, useFormContext } from "react-hook-form";

function EmailInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data || data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          const regEmail =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
          if (!regEmail.test(data)) {
            return "올바른 이메일 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="이메일"
          placeholder="이메일을 입력해주세요."
          onChangeText={onChange}
          value={value}
          error={error?.message}
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="email"
          onSubmitEditing={() => setFocus("password")}
        />
      )}
      name="email"
    />
  );
}

export default EmailInput;
