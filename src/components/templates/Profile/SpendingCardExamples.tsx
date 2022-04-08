import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { CAUTION_SPENDING_EXAMPLES, DANGER_SPENDING_EXAMPLES, GOOD_SPENDING_EXAMPLES } from "../../../constants/Lists";
import TextLabel from "../../atoms/typography/TextLabel";
import SpendingCard from "../../molecules/display/SpendingCard";

interface props {
  lowValue: string,
  highValue: string,
  currency: string,
}

const SpendingCardExamples: React.FC<props> = ({
  lowValue, highValue, currency
}) => {

  const tailwind = useTailwind();
  const [goodExample, setGoodExample] = useState("");
  const [cautionExample, setCautionExample] = useState("");
  const [dangerExample, setDangerExample] = useState("");

  useEffect(() => {
    setGoodExample(GOOD_SPENDING_EXAMPLES[Math.floor((Math.random() * GOOD_SPENDING_EXAMPLES.length))])
    setCautionExample(CAUTION_SPENDING_EXAMPLES[Math.floor((Math.random() * CAUTION_SPENDING_EXAMPLES.length))])
    setDangerExample(DANGER_SPENDING_EXAMPLES[Math.floor((Math.random() * DANGER_SPENDING_EXAMPLES.length))])
  }, [])


  return (
    <View>
      <TextLabel text={"Example"} textStyle={tailwind("font-bold")} />
      <SpendingCard
        amountSpent={lowValue ? `${Number(lowValue) - 1}` : "0"}
        currencyRate={currency}
        description={goodExample}
        threshold="good"
      />
      <SpendingCard
        amountSpent={lowValue ? lowValue : "0"}
        currencyRate={currency}
        description={cautionExample}
        threshold="low"
      />
      <SpendingCard
        amountSpent={highValue ? highValue : "0"}
        currencyRate={currency}
        description={dangerExample}
        threshold="high"
      />
    </View>
  )
}

export default SpendingCardExamples;