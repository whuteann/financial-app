import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AngleLeftIcon } from "../../../../assets/SVG/SVG";
import TextLabel from "../typography/TextLabel";

interface buttonProps {
  label: string,
  onPress?: () => void,
}

const BackButton: React.FC<buttonProps> = ({
  label, onPress = () => { }
}) => {

  const tailwind = useTailwind();

  return (

    <View style={tailwind("w-[35%]")}>
      <TouchableOpacity onPress={onPress}>
        <View style={tailwind("w-full h-12 pt-[8px] items-center mb-1 flex-row justify-start items-center")}>
          <AngleLeftIcon height={14} width={14} />
          <View style={tailwind("mt-[7px] ml-2")}>
            <TextLabel text={label} textStyle={tailwind("text-16px mb-1")} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default BackButton;