import React from "react";
import InputField from "@/components/InputField";
import { Controller, useFormContext } from "react-hook-form";

function PhoneInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data || data.length === 0) {
            return "휴대폰 번호를 숫자만 입력해주세요.";
          }

          const regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
          if (!regPhone.test(data)) {
            return "올바른 휴대폰 번호 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="휴대폰번호"
          placeholder="휴대폰번호를 입력해주세요."
          onChangeText={onChange}
          value={value}
          error={error?.message}
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="numeric"
          onSubmitEditing={() => setFocus("password")}
        />
      )}
      name="phone"
    />
  );
}

export default PhoneInput;
