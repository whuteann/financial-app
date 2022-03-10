import moment from "moment";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../../atoms/typography/TextLabel";
import SpendingCard from "../../molecules/display/SpendingCard";


const SpendingsSection = () => {

  const tailwind = useTailwind();

  return (
    <View>
      <TextLabel text="Spendings March:" textStyle={tailwind("text-20px font-bold")} />
      <View style={tailwind("mt-3")}>
        <SpendingCard amountSpent="10.00" description="Lunch with family" />
        <SpendingCard amountSpent="115.00" description="Groceries" />
        <SpendingCard amountSpent="46.80" description="Gas" />
      </View>
    </View>
  )
}

export default SpendingsSection;