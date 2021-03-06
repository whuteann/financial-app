import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import BackButton from "../../components/atoms/buttons/BackButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import TextLabel from "../../components/atoms/typography/TextLabel";
import SpendingCard from "../../components/molecules/display/SpendingCard";
import { SPENDINGS, TABS } from "../../constants/Firebase";
import { getThresholdValue } from "../../helpers/Generichelper";
import { IndexStackProps } from "../../navigation/NavigationProps/NavigationProps";
import { UserSelector } from "../../redux/reducers/Auth";
import { SpendingList, SpendingTab } from "../../types/SpendingList";
import LoadingScreen from "../Loading/LoadingScreen";


const SpendingIndexScreen = ({ navigation, route }: IndexStackProps<"SpendingIndex">) => {

  const tailwind = useTailwind();
  const { monthID } = route.params;
  const user = useSelector(UserSelector);

  const { data: monthData } = useDocument<SpendingList>(`${SPENDINGS}/${monthID}`, {
    listen: true,
  })

  const { data: spendings } = useCollection<SpendingTab>(`${SPENDINGS}/${monthID}/${TABS}`, {
    orderBy: ["created_at", "desc"],
    listen: true,
  })

  if (!spendings || !user || !monthData) { return <LoadingScreen /> }

  return (
    <Body>

      <Section>
        <BackButton label="Return" onPress={() => { navigation.navigate("MonthIndex") }} />
        <TextLabel text={`Your spendings for the month of ${monthData.month}, ${monthData.year}`} textStyle={tailwind("text-20px font-bold")} />
        <View style={tailwind("border mb-5 mt-2")} />
        <TextLabel text={`Total Spending: `} />
        <TextLabel text={`${user.currency} ${monthData.amount}`} textStyle={tailwind("text-20px font-bold")} />
        <View style={tailwind("border mb-[30px] w-1/2 mt-2")} />
      </Section>
      <Section>
        {
          spendings.map(item => {
            return <SpendingCard
              key={item.id}
              tabID={item.id}
              collectionID={monthID}
              currencyRate={user.currency}
              description={item.description}
              amountSpent={item.amount}
              created_date={item.created_date}
              created_day={item.created_day}
              threshold={getThresholdValue(item.amount, user.caution_thres, user.danger_thres)}
            />
          })
        }
      </Section>
    </Body>
  )
}

export default SpendingIndexScreen;