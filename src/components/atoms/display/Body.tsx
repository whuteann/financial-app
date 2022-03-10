import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface bodyProps {
  children: React.ReactNode,
}

const Body: React.FC<bodyProps> = ({
  children
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind("h-full bg-secondary items-center pt-5")}>
      <View style={tailwind("w-5/6 mb-5")}>
        {children}
      </View>
    </View>
  )
}

export default Body;