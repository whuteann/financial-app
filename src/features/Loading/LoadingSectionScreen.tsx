import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../../components/atoms/typography/TextLabel";

type loadingProps = {
  message?: string,
}

const LoadingSectionScreen: React.FC<loadingProps> = ({
  message = 'Loading...',
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind(`bg-secondary w-full z-10 items-center py-10`)}>
      <View style={tailwind("justify-end flex-col")}>
        <ActivityIndicator size={75} color={"#54d7ff"} />
        <View>
          <TextLabel text={message} textStyle={tailwind("text-20px")} />
        </View>
      </View>
    </View>
  )
}

export default LoadingSectionScreen;