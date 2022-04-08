import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import DropdownField from '../../atoms/input/DropdownInput';
import TextLabel from '../../atoms/typography/TextLabel';

interface Props {
  title: string,
  items: Array<string>,
  placeholder?: string,
  value?: string,
  onChangeValue?: (value: string) => void,
  hasError?: boolean,
  errorMessage?: string,
}

const FormDropdownInput: React.FC<Props> = ({
  title, placeholder = "", items, onChangeValue = () => { }, value = "", hasError = false, errorMessage = ""
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("w-full")}>
      <TextLabel text={title} />
      <DropdownField
        value={value}
        items={items}
        placeholder={placeholder}
        onChangeValue={onChangeValue}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </View>
  );
}

export default FormDropdownInput;