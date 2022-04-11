import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../../components/atoms/typography/TextLabel";

type loadingProps = {
  message?: string,
}

const LoadingScreen: React.FC<loadingProps> = ({
  message = 'Loading...',
}) => {

  const tailwind = useTailwind();

  return (
    <View style={tailwind(`bg-secondary w-full h-full z-10 items-center`)}>
      <View style={tailwind("justify-end flex-col mt-[300px]")}>
        <ActivityIndicator size={130} color={"#54d7ff"} />
        <View style={tailwind("mt-[30px]")}>
          <TextLabel text={message} textStyle={tailwind("text-20px")} />
        </View>
      </View>
    </View>
  )
}

export default LoadingScreen;