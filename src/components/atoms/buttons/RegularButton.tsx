import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../typography/TextLabel";

interface buttonProps {
  label: string,
  onPress?: () => void,
  style?: "Primary" | "Secondary" | "Disabled",
}

const RegularButton: React.FC<buttonProps> = ({
  label, onPress = () => { }, style = "Primary"
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind("w-full")}>
      <TouchableOpacity onPress={onPress}>
        <View style={tailwind("bg-highlight w-full h-12 pt-[10px] items-center rounded-xl mb-3")}>
          <TextLabel text={label} textStyle={tailwind("text-secondary text-18px mb-1 font-bold")} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default RegularButton;