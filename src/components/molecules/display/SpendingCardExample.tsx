import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { TrashIcon } from "../../../../assets/SVG/SVG";
import { CURRENCIES } from "../../../constants/Lists";
import TextLabel from "../../atoms/typography/TextLabel";

export type thresholds = "caution" | "danger" | "good";

interface cardProps {
  amountSpent: number,
  description: string,
  currencyRate?: string,
  threshold?: "caution" | "danger" | "good",
}

const SpendingCardExample: React.FC<cardProps> = ({
  amountSpent, description, threshold = "good", currencyRate = CURRENCIES[0]
}) => {
  const tailwind = useTailwind();
  const [textColor, setTextColor] = useState("");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    switch (threshold) {
      case "danger":
        setTextColor("text-red-500");
        break;
      case "caution":
        setTextColor("text-yellow-500");
        break;
      case "good":
        setTextColor("text-green-500");
        break;
    }
  });

  return (
    <TouchableOpacity onPress={() => { setPressed(!pressed) }}>
      <View style={tailwind("box-card-shadow bg-white px-4 py-2 mb-3 flex-row")}>
        <View style={tailwind("w-[70%]")}>
          <TextLabel text={`${currencyRate} ${amountSpent}`} textStyle={tailwind(`text-16px font-bold mb-0 ${textColor}`)} bodyStyle={tailwind("mb-0")} />
          <TextLabel text={description} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SpendingCardExample;