import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface SectionProps {
  children: React.ReactNode,
  padding?: string,
  bgColor?: string,
  width?: string,
  margin?: string,
}

const Section: React.FC<SectionProps> = ({
  children, padding = "", bgColor = "", width = "", margin = ""
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind(`bg-secondary items-center ${padding} ${bgColor} ${margin}`)}>
      <View style={tailwind(`w-5/6 ${width}`)}>
        {children}
      </View>
    </View>
  )
}

export default Section;