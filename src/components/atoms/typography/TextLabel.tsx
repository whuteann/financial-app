import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface labelProps {
  text: string,
  textStyle?: any,
  bodyStyle?: any,
  color?: string,
}

const TextLabel: React.FC<labelProps> = ({
  text, textStyle = null, bodyStyle = null, color = ""
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
          tailwind(`text-14px text-primary ${color} font-sans`),
          textStyle
        ]}
      >
        {text}
      </Text>
    </View>
  )
}

export default TextLabel;