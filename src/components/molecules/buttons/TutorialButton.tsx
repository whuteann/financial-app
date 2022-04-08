import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { InfoIcon } from "../../../../assets/SVG/SVG";


interface buttonProps {
  content: any,
}

const TutorialButton: React.FC<buttonProps> = ({
  content,
}) => {

  const tailwind = useTailwind();
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => { setVisible(true); }}>
        <InfoIcon height={20} width={20} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
      >
        <TouchableOpacity
          style={tailwind("bg-gray-faded h-full justify-center items-center")}
          activeOpacity={1}
          onPressOut={() => { setVisible(false) }}
        >
          <View style={tailwind("w-[95%] bg-white box-card-shadow p-5")}>
            {content}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default TutorialButton;