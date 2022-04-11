import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AngleRightIcon } from "../../../../assets/SVG/SVG";
import TextLabel from "../../atoms/typography/TextLabel";

interface cardProps {
  month: string,
  year: string,
  total: string,
  currencyRate: string,
  onPress: () => void;
}

const MonthCard: React.FC<cardProps> = ({
  month, year, total, currencyRate, onPress
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tailwind("box-card-shadow bg-white h-16 px-4 py-2 mb-3 flex-row  ")}>
        <View style={tailwind("w-[90%]")}>
          <View style={tailwind("flex-row")}>
            <TextLabel text={`${month}`} textStyle={tailwind("text-16px font-bold")} />
            <TextLabel text={`${year}`} textStyle={tailwind("text-16px ml-1 font-bold")} />
          </View>
          <TextLabel text={`Total spent: ${currencyRate}${total}`} textStyle={tailwind("text-12px")} />
        </View>
        <View style={tailwind("pt-3")}>
          <AngleRightIcon height={25} width={25} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MonthCard;