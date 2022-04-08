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
}

const MonthCard: React.FC<cardProps> = ({
  month, year, total, currencyRate
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity>
      <View style={tailwind("box-card-shadow bg-white h-16 px-4 py-2 mb-3 flex-row  ")}>
        <View style={tailwind("w-[90%]")}>
          <TextLabel text={`${month} ${year}`} textStyle={tailwind("text-16px font-bold")} />
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