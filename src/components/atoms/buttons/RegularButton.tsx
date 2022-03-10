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
  label, onPress = ()=>{}, style = "Primary"
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind("bg-sky h-12 py-2 items-center rounded-xl mb-3")}>
      <TouchableOpacity>
        <TextLabel text={label} textStyle={tailwind("text-white text-18px mb-1 font-bold")}/>
      </TouchableOpacity>
    </View>
  )
}

export default RegularButton;