import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
      >
        <View style={tailwind(`h-full bg-secondary items-center ${variant == "primary" ? "pt-7" : ""}`)}>
          <View style={tailwind(" w-full mb-5")}>
            {children}
          </View>
        </View>
        <View style={tailwind("h-[50px]")}/>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Body;