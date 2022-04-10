import { useCollection } from "@nandorojo/swr-firestore";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { SPENDINGS, TABS } from "../../../constants/Firebase";
import LoadingSectionScreen from "../../../features/Loading/LoadingSectionScreen";
import { numToMonth } from "../../../helpers/Generichelper";
import { UserSelector } from "../../../redux/reducers/Auth";
import { SpendingTab } from "../../../types/SpendingList";
import Section from "../../atoms/display/Section";
import TextLabel from "../../atoms/typography/TextLabel";

interface sectionProps {
  greetingMsg: string,
  name: string,
}

const TotalSection: React.FC<sectionProps> = ({
  greetingMsg,name
}) => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);
  let total = 0;

  const { data: month } = useCollection(SPENDINGS, {
    where: [
      ['user_id', '==', user?.id],
      ['month', '==', numToMonth(moment().toDate().getMonth())],
      ['year', '==', moment().toDate().getFullYear()],
    ],
    listen: true,
  })

  const { data: tabs } = useCollection<SpendingTab>(`${SPENDINGS}/${month ? month[0].id : ""}/${TABS}`, {
    listen: true,
  })


  if (!month || !tabs || !user) return <LoadingSectionScreen />

  tabs.map(item => {
    total = total + item.amount;
  })

  return (
    <Section bgColor="bg-primary" padding="py-4" margin="mb-4">
      <View>
        <TextLabel text={`${greetingMsg},`} textStyle={tailwind("text-20px font-bold")} color={"text-highlight"}/>
        <TextLabel text={`${name}!`} textStyle={tailwind("text-20px font-bold")} color={"text-highlight"}/>
        <TextLabel text={`This month's total (${numToMonth(moment().toDate().getMonth())}): `} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`${user.currency} ${total}`} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
      </View>
    </Section>
  )
}

export default TotalSection;