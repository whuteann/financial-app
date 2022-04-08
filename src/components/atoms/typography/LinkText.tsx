import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface labelProps {
  text: string,
  textStyle?: any,
  bodyStyle?: any,
  onPress?: () => void
}

const LinkText: React.FC<labelProps> = ({
  text, textStyle = null, bodyStyle = null, onPress = () => { }
}) => {

  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("mb-1"),
        bodyStyle,
      ]}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            tailwind(`text-14px text-highlight font-sans`),
            textStyle
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LinkText;