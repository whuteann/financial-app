import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import TextInputField from "../../components/atoms/input/TextInputField";
import TextLabel from "../../components/atoms/typography/TextLabel";
import SpendingCard from "../../components/molecules/display/SpendingCard";
import SpendingsSection from "../../components/templates/dashboard/SpendingsSection";

const Dashboard = () => {

  const tailwind = useTailwind();
  const [greetingMsg, setGreetingMsg] = useState<string>();
  let name = "Celine Tioh";

  useEffect(() => {
    let currentHour = moment().toDate().getHours();
    if (currentHour < 12) {
      setGreetingMsg("Good Morning");
    } else if (currentHour < 16) {
      setGreetingMsg("Good Afternoon");
    } else {
      setGreetingMsg("Good Evening");
    }
  }, [])

  return (
    <Body>
      <View>
        <TextLabel text={`${greetingMsg}, ${name}`} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`What did you spend on? How much?`} />

        <View style={tailwind("mt-5")}>
          <TextInputField placeholder="A short description... " />
          <TextInputField placeholder="amount(RM) " />
        </View>

        <RegularButton label="Add!" />
        
        <View style={tailwind("mt-10")}>
          <SpendingsSection />
        </View>

      </View>
    </Body>
  )
}

export default Dashboard;