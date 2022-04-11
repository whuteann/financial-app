import { useCollection } from "@nandorojo/swr-firestore";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { SPENDINGS, TABS } from "../../../constants/Firebase";
import LoadingSectionScreen from "../../../features/Loading/LoadingSectionScreen";
import { getThresholdValue, numToMonth } from "../../../helpers/Generichelper";
import { UserSelector } from "../../../redux/reducers/Auth";
import { SpendingTab } from "../../../types/SpendingList";
import TextLabel from "../../atoms/typography/TextLabel";
import SpendingCard, { thresholds } from "../../molecules/display/SpendingCard";


const RecentSpendingsSection = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);

  const { data: month } = useCollection(SPENDINGS, {
    where: [
      ['user_id', '==', user?.id],
      ['month', '==', numToMonth(moment().toDate().getMonth())],
      ['year', '==', moment().toDate().getFullYear()],
    ],
    listen: true,
  })

  const { data: tabs } = useCollection<SpendingTab>(`${SPENDINGS}/${month ? (month.length == 0 ? "" : month[0].id) : ""}/${TABS}`, {
    orderBy: ["created_at", "desc"],
    limit: 4,
    listen: true,
  })

  if (!month || !user) return <LoadingSectionScreen />


  return (
    <View>
      <TextLabel text="Recent Spendings:" textStyle={tailwind("text-20px font-bold")} />
      <View style={tailwind("mt-3")}>
        {
          tabs
            ?
            tabs.map(item => {
              return <SpendingCard
                key={item.id}
                tabID={item.id}
                collectionID={month[0].id}
                currencyRate={user.currency}
                description={item.description}
                amountSpent={item.amount}
                created_date={item.created_date}
                created_day={item.created_day}
                threshold={getThresholdValue(item.amount, user.caution_thres, user.danger_thres)}
              />
            })
            :
            null
        }
      </View>
    </View>
  )
}

export default RecentSpendingsSection;