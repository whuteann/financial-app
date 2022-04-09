import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";

import TextLabel from "../../components/atoms/typography/TextLabel";
import AddSpendingSection from "../../components/templates/dashboard/AddSpendingSection";
import RecentSpendingsSection from "../../components/templates/dashboard/RecentSpendingsSection";
import TotalSection from "../../components/templates/dashboard/TotalSection";
import { UserSelector } from "../../redux/reducers/Auth";
import LoadingScreen from "../Loading/LoadingScreen";


const Dashboard = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);
  const [greetingMsg, setGreetingMsg] = useState<string>();

  if (!user) { return <LoadingScreen /> }

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
        <TextLabel text={`${greetingMsg},`} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`${name}!`} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`What did you spend on? How much?`} />

        <AddSpendingSection />
      </Section>

      <TotalSection />

      <Section>
        <View>
          <RecentSpendingsSection />
        </View>
      </Section>
    </Body>
  )
}

export default Dashboard;