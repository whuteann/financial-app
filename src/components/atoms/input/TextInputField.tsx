import React from "react";
import { TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../typography/TextLabel";

interface inputProps {
  placeholder: string,
  value?: string,
  hasError?: string,
  errorMessage?: string,
}

const TextInputField: React.FC<inputProps> = ({
  placeholder, hasError = false, errorMessage = "Error"
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind("mb-3")}>
      <View style={tailwind("box-card-shadow bg-white h-12 py-2 px-3 mb-1")}>
        <TextInput
          placeholder={placeholder}
          style={tailwind("font-sans text-18px")}
        />
      </View>
      {
        hasError
          ?
          <TextLabel text={errorMessage} textStyle={tailwind("text-red-500 ml-2")}/>
          :
          null
      }
    </View>
  )
}

export default TextInputField;