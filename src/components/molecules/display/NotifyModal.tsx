import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import RegularButton from '../../atoms/buttons/RegularButton';
import TextLabel from '../../atoms/typography/TextLabel';

interface ModalProps {
  text: string,
  buttonText?: string,
  visible: boolean,
  setModal: (visible: boolean) => void,
}

const NotifyModal: React.FC<ModalProps> = ({
  text, buttonText = "Done", visible, setModal
}) => {
  let buttons;
  const tailwind = useTailwind();

  buttons = (
    <View style={tailwind("flex-row flex justify-around mt-6 w-[80%] ml-2 items-center")}>
      <RegularButton variant="Primary" label={buttonText} onPress={() => setModal(false)} />
    </View>
  )

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <TouchableOpacity
        style={tailwind("bg-gray-faded h-full justify-center items-center")}
        activeOpacity={1}
        onPressOut={() => { setModal(false); }}
      >
        <View style={[styles.boxWithShadow, Platform.OS != "web" ? tailwind("items-center bg-white w-9/12 p-5") : tailwind("items-center bg-white  w-[88%] sm:w-[75%] md:w-[45%] lg:w-[30%]  xl:w-[25%] p-5")]} >
          <TextLabel text={text} textStyle={tailwind("font-bold text-center")} />
          {buttons}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 10,
  }
});

export default NotifyModal;