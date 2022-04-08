import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";

import TextInputField from "../../components/atoms/input/TextInputField";
import TextLabel from "../../components/atoms/typography/TextLabel";
import RecentSpendingsSection from "../../components/templates/dashboard/RecentSpendingsSection";
import { numToMonth } from "../../helpers/Generichelper";
import { UserSelector } from "../../redux/reducers/Auth";
import LoadingScreen from "../Loading";


const Dashboard = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);
  const [greetingMsg, setGreetingMsg] = useState<string>();
  
  if (!user) { <LoadingScreen /> }
  
  let name = user?.name;
  
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
      <Section>
        <TextLabel text={`${greetingMsg}, ${name}`} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`What did you spend on? How much?`} />

        <View style={tailwind("mt-5")}>
          <TextInputField placeholder="A short description... " />
          <TextInputField placeholder="amount(RM) " />
        </View>

        <RegularButton label="Add!" />
      </Section>

      <Section bgColor="bg-primary" padding="py-4" margin="my-4">
        <View>
          <TextLabel text={`This month's total (${numToMonth(moment().toDate().getMonth())}): `} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
          <TextLabel text={`RM 1234.00`} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
        </View>
      </Section>

      <Section>
        <View>
          <RecentSpendingsSection />
        </View>
      </Section>



    </Body>
  )
}

export default Dashboard;