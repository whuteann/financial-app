import { useCollection } from "@nandorojo/swr-firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import Split from "../../components/atoms/display/Split";
import DropdownField from "../../components/atoms/input/DropdownInput";
import TextLabel from "../../components/atoms/typography/TextLabel";
import MonthCard from "../../components/molecules/display/MonthCard";
import { SPENDINGS } from "../../constants/Firebase";
import { numToMonth } from "../../helpers/Generichelper";
import { IndexStackProps } from "../../navigation/NavigationProps/NavigationProps";
import { UserSelector } from "../../redux/reducers/Auth";
import { SpendingList } from "../../types/SpendingList";


const MonthIndexScreen = ({ navigation }: IndexStackProps<"MonthIndex">) => {

  const tailwind = useTailwind();
  const [year, setYear] = useState(`${moment().toDate().getFullYear()}`);
  const [month, setMonth] = useState(numToMonth(moment().toDate().getMonth()));
  const [yearList, setYearList] = useState<Array<string>>([]);
  const user = useSelector(UserSelector);

  useEffect(() => {
    let years: Array<string> = [];
    for (let start = 2022; start <= Number(moment().format("YYYY")); start++) {
      years.push(start.toString());
    }
    setYearList(years);
  }, [])

  const { data: monthList } = useCollection<SpendingList>(SPENDINGS, {
    where: [
      ['user_id', '==', user?.id],
      ['month', '==', month],
      ['year', '==', Number(year)],
    ],
    listen: true,
  })

  return (
    <Body>
      <Section>
        <TextLabel text={`Pick a month, and we will show you your spendings!`} textStyle={tailwind("text-20px font-bold")} />
        <View style={tailwind("border mb-5 mt-2")} />
        <TextLabel text={`Filters: `} />
        <Split
          left={
            <DropdownField
              items={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
              value={month}
              onChangeValue={(value) => { setMonth(value); }}
            />
          }
          right={
            <DropdownField
              items={yearList}
              value={year}
              onChangeValue={(value) => { setYear(value); }}
            />
          }
        />
        <View style={tailwind("border mb-[30px] w-1/2 mt-2")} />
        {
          monthList
            ?
            monthList.map(item => {
              return <MonthCard
                key={item.id}
                month={item.month}
                year={`${item.year}`}
                total={`${item.amount}`}
                currencyRate={user?.currency || ""}
                onPress={() => { navigation.navigate("SpendingIndex", { monthID: item.id }) }}
              />
            })
            :
            null
        }


      </Section>
    </Body>
  )
}

export default MonthIndexScreen;