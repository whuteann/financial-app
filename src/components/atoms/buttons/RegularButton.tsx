import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../typography/TextLabel";

interface buttonProps {
  label: string,
  onPress?: () => void,
  variant?: "Primary" | "Secondary" | "Disabled",
  loading?: boolean,
}

const RegularButton: React.FC<buttonProps> = ({
  label, onPress = () => { }, variant = "Primary", loading = false
}) => {

  const tailwind = useTailwind();
  let buttonBody = <></>;

  switch (variant) {
    case "Primary":
      buttonBody = (
        <View style={tailwind("bg-highlight w-full h-12 pt-[10px] items-center rounded-xl mb-3")}>
          <TextLabel text={label} textStyle={tailwind("text-secondary text-18px mb-1 font-bold")} />
        </View>
      )
      break;
    case "Secondary":
      buttonBody = (
        <View style={tailwind("bg-secondary w-full h-12 pt-[8px] items-center rounded-xl mb-3 border border-highlight border-2")}>
          <TextLabel text={label} textStyle={tailwind("text-highlight text-18px mb-1 font-bold")} />
        </View>
      )
      break;
  }

  return (
    <View style={tailwind("w-full")}>
      {
        loading
          ?
          <View style={tailwind("bg-highlight w-full h-12 pt-[10px] items-center rounded-xl mb-3")}>
            <ActivityIndicator size={25} color={"white"} />
          </View>
          :
          <TouchableOpacity onPress={onPress}>
            {buttonBody}
          </TouchableOpacity>
      }
    </View>
  )
}

export default RegularButton;