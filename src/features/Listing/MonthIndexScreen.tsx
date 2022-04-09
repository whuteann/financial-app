import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AngleRightIcon, ArrowRight } from "../../../assets/SVG/SVG";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import TextLabel from "../../components/atoms/typography/TextLabel";
import MonthCard from "../../components/molecules/display/MonthCard";


const MonthIndexScreen = () => {

  const tailwind = useTailwind();

  return (
    <Body>
      <Section>
        {/* <TextLabel text={`Pick a month, and we will show you your spendings!`} textStyle={tailwind("text-20px font-bold")} />
        <View style={tailwind("border mb-5 mt-2")} />

        <MonthCard month="April" year="2022" total="1000" currencyRate="RM"/> */}

      </Section>
    </Body>
  )
}

export default MonthIndexScreen;