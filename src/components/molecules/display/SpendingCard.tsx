import { revalidateCollection } from "@nandorojo/swr-firestore";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { TrashIcon } from "../../../../assets/SVG/SVG";
import { SPENDINGS, TABS } from "../../../constants/Firebase";
import { CURRENCIES } from "../../../constants/Lists";
import { deleteSpendingCard } from "../../../services/SpendingServices";
import TextLabel from "../../atoms/typography/TextLabel";
import ConfirmModal from "./ConfirmModal";

export type thresholds = "caution" | "danger" | "good";

interface cardProps {
  amountSpent: number,
  description: string,
  currencyRate?: string,
  tabID: string,
  collectionID: string,
  threshold?: "caution" | "danger" | "good",
  created_date?: string,
  created_day?: string,
}

const SpendingCard: React.FC<cardProps> = ({
  amountSpent, description, threshold = "good", currencyRate = CURRENCIES[0], created_date = "", created_day = "", tabID, collectionID
}) => {
  const tailwind = useTailwind();
  const [textColor, setTextColor] = useState("");
  const [pressed, setPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    switch (threshold) {
      case "danger":
        setTextColor("text-red-500");
        break;
      case "caution":
        setTextColor("text-yellow-500");
        break;
      case "good":
        setTextColor("text-green-500");
        break;
    }
  });

  const deleteItem = () => [
    deleteSpendingCard(collectionID, tabID, () => {
      revalidateCollection(`${SPENDINGS}/${collectionID}/${TABS}`);
    }, () => {

    })
  ]

  const modal = <ConfirmModal
    text="Are you sure you want to delete this?"
    onProceed={() => deleteItem()}
    onCancel={() => setPressed(false)}
    visible={modalVisible}
    setModal={setModalVisible}
    buttonText="Yea"
  />

  return (
    <TouchableOpacity onPress={() => { setPressed(!pressed) }}>
      {modal}
      <View style={tailwind("box-card-shadow bg-white px-4 py-2 mb-3 flex-row")}>
        <View style={tailwind("w-[70%]")}>
          <TextLabel text={`${currencyRate} ${amountSpent}`} textStyle={tailwind(`text-16px font-bold mb-0 ${textColor}`)} bodyStyle={tailwind("mb-0")} />
          <TextLabel text={description} />
        </View>
        <View style={tailwind(" border border-primary")} />
        {
          pressed
            ?
            <View style={tailwind("justify-center ml-[13%]")}>
              <TouchableOpacity onPress={() => { setModalVisible(true); }}>
                <TrashIcon height={25} width={25} />
              </TouchableOpacity>
            </View>
            :
            <View style={tailwind("w-[25%] ml-[5%] mt-1")}>
              <TextLabel text={`${created_date}`} textStyle={tailwind(`mb-0`)} bodyStyle={tailwind("mb-0")} />
              <TextLabel text={created_day} />
            </View>
        }
      </View>
    </TouchableOpacity>
  )
}

export default SpendingCard;