import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../../atoms/typography/TextLabel";

interface buttonProps {
  label: string,
  icon: any,
}

const BottomTab: React.FC<buttonProps> = ({
  label, icon
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind("items-center")}>
      {icon}
      <TextLabel text={label} />
    </View>
  )
}

export default BottomTab;