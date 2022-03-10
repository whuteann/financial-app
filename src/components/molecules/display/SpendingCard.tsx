import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import TextLabel from "../../atoms/typography/TextLabel";

interface cardProps {
  amountSpent: string,
  description: string,
}

const SpendingCard: React.FC<cardProps> = ({
  amountSpent, description,
}) => {
  const tailwind = useTailwind();
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (Number(amountSpent) > 100) {
      setTextColor("text-red-500");
    } else if (Number(amountSpent) > 30) {
      setTextColor("text-yellow-500");
    } else {
      setTextColor("");
    }
  });

  return (
    <View style={tailwind("box-card-shadow bg-white h-16 px-4 py-2 mb-3")}>
      <TextLabel text={`RM ${amountSpent}`} textStyle={tailwind(`text-16px font-bold mb-0 ${textColor}`)} bodyStyle={tailwind("mb-0")} />
      <TextLabel text={description} />
    </View>
  )
}

export default SpendingCard;