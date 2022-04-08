import React from "react";
import { TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../typography/TextLabel";

interface inputProps {
  placeholder: string,
  value?: string,
  hasError?: boolean,
  errorMessage?: string,
  number?: boolean,
  password?: boolean,
  onChangeValue?: (value: string) => void;
  editable?: boolean
}

const TextInputField: React.FC<inputProps> = ({
  placeholder, hasError = false, errorMessage = "Error", onChangeValue = () => { }, value = "", number = false, password = false, editable = true
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind(`mb-3`)}>
      <View style={tailwind(`box-card-shadow ${editable ? "bg-white": ""}  h-12 pt-[10px] px-3 mb-1 ${hasError ? "border border-red-500" : ""}`)}>
        <TextInput
          placeholder={placeholder}
          editable={editable}
          secureTextEntry={password}
          value={value}
          style={tailwind(`font-sans text-14px ${editable ? "" : "text-gray-primary"}`)}
          onChangeText={(val) => {
            number
              ?
              onChangeValue(val.replace(/[^0-9, .]/g, ''))
              :
              onChangeValue(val);
          }}
        />
      </View>
      {
        hasError
          ?
          <TextLabel text={errorMessage} textStyle={tailwind("text-red-500 ml-2")} />
          :
          null
      }
    </View>
  )
}

export default TextInputField;