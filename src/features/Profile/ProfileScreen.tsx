import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import Split from "../../components/atoms/display/Split";
import TextLabel from "../../components/atoms/typography/TextLabel";
import SpendingCard from "../../components/molecules/display/SpendingCard";
import FormDropdownInput from "../../components/molecules/input/FormDropdownInput";
import FormTextInput from "../../components/molecules/input/FormTextInput";
import { CURRENCIES } from "../../constants/Lists";


const ProfileScreen = () => {

  const tailwind = useTailwind();
  const [currencyRate, setCurrencyRate] = useState("RM");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");

  return (
    <Body>
      <Section>
        <TextLabel text={`Lets edit your profile ;)`} textStyle={tailwind("text-20px font-bold")} />

        <View style={tailwind("mt-6")} />
        <FormTextInput title="Name" placeholder="name here..." />
        <FormDropdownInput value={currencyRate} title="Currency" items={CURRENCIES} onChangeValue={(value) => { setCurrencyRate(value) }} />

        <View style={tailwind("mt-4")} />
        <TextLabel text={"Spending Thresholds"} textStyle={tailwind("font-bold")} />
        <Split
          left={
            <FormTextInput
              title="Low"
              placeholder={`${currencyRate}...`}
              value={low}
              number={true}
              onChangeValue={(value) => { setLow(value) }}
            />}
          right={<FormTextInput title="High" placeholder={`${currencyRate}...`} value={high} onChangeValue={(value) => { setHigh(value) }} />}
        />

        <View style={tailwind("mt-4")} />
        <TextLabel text={"Example"} textStyle={tailwind("font-bold")} />
        <SpendingCard
          amountSpent={low ? low : "0"}
          currencyRate={currencyRate}
          description="Example Low Spending"
          threshold="low"
        />
        <SpendingCard
          amountSpent={high ? high : "0"}
          currencyRate={currencyRate}
          description="Example High Spending"
          threshold="high"
        />

        <View style={tailwind("mt-7")} />
        <RegularButton
          label="Update Profile"
        />

      </Section>
    </Body>
  )
}

export default ProfileScreen;