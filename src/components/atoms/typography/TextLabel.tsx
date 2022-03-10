import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface labelProps {
  text: string,
  textStyle?: any,
  bodyStyle?: any
}

const TextLabel: React.FC<labelProps> = ({
  text, textStyle = null, bodyStyle = null
}) => {

  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("mb-1"),
        bodyStyle,
      ]}>
      <Text
        style={[
          tailwind("text-14px text-primary font-sans"),
          textStyle
        ]}
      >
        {text}
      </Text>
    </View>
  )
}

export default TextLabel;