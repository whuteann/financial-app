import React from "react";
import { ScrollView, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";

interface bodyProps {
  children: React.ReactNode,
  variant?: "primary" | "secondary",
  height?: string,
}

const Body: React.FC<bodyProps> = ({
  children, variant = "primary", height = "300%"
}) => {

  const tailwind = useTailwind();

  return (
    <SafeAreaView style={{ height: `${height ? height : "300%"}` }}>
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
        style={{ height: `${height ? height : "300%"}` }}
      >
        <View style={[{height: `${height ? height : "300%"}`}, tailwind(`bg-secondary items-center ${variant == "primary" ? "pt-7" : ""}`)]}>
          <View style={tailwind(" w-full mb-5")}>
            {children}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Body;