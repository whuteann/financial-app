import React from "react";
import { ScrollView, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";

interface bodyProps {
  children: React.ReactNode,
  topSpace?: boolean,
  bottomSpace?: boolean,
}

const Body: React.FC<bodyProps> = ({
  children, topSpace = true, bottomSpace = true,
}) => {

  const tailwind = useTailwind();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[
        tailwind('flex flex-grow bg-secondary h-full'),
        topSpace ? tailwind("pt-5") : null,
      ]}>
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always" >
          <View style={[tailwind('w-full mx-auto mb-5'),]}>
            {children}
            {
              bottomSpace
                ?
                <View style={tailwind("h-16")} />
                :
                null
            }

          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Body;