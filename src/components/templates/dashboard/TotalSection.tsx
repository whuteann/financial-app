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

const TotalSection = () => {

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
    <Section bgColor="bg-primary" padding="py-4" margin="my-4">
      <View>
        <TextLabel text={`This month's total (${numToMonth(moment().toDate().getMonth())}): `} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
        <TextLabel text={`${user.currency} ${total}`} color={"text-secondary"} textStyle={tailwind("text-20px font-bold")} />
      </View>
    </Section>
  )
}

export default TotalSection;