import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface bodyProps {
  children: React.ReactNode,
  variant?: "primary" | "secondary",
}

const Body: React.FC<bodyProps> = ({
  children, variant = "primary"
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind(`h-full bg-secondary items-center ${variant == "primary" ? "pt-10" : ""}`)}>
      <View style={tailwind(" w-full mb-5")}>
        {children}
      </View>
    </View>
  )
}

export default Body;