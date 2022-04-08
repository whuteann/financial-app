import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { CURRENCIES } from "../../../constants/Lists";
import TextLabel from "../../atoms/typography/TextLabel";

interface cardProps {
  amountSpent: string,
  description: string,
  currencyRate?: string,
  threshold?: "low" | "high" | "neutral",
}

const SpendingCard: React.FC<cardProps> = ({
  amountSpent, description, threshold = "neutral", currencyRate = CURRENCIES[0]
}) => {
  const tailwind = useTailwind();
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    switch (threshold) {
      case "high":
        setTextColor("text-red-500");
        break;
      case "low":
        setTextColor("text-yellow-500");
        break;
      case "neutral":
        setTextColor("");
        break;
    }
  });

  return (
    <View style={tailwind("box-card-shadow bg-white h-16 px-4 py-2 mb-3")}>
      <TextLabel text={`${currencyRate} ${amountSpent}`} textStyle={tailwind(`text-16px font-bold mb-0 ${textColor}`)} bodyStyle={tailwind("mb-0")} />
      <TextLabel text={description} />
    </View>
  )
}

export default SpendingCard;