import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import TextInputField from '../../atoms/input/TextInputField';
import TextLabel from '../../atoms/typography/TextLabel';

interface Props {
  title: string,
  placeholder?: string,
  value?: string,
  onChangeValue?: (value: string) => void,
  number?: boolean,
  password?: boolean,
  hasError?: boolean
  errorMessage?: string,
  editable?: boolean,
}

const FormTextInput: React.FC<Props> = ({
  title, placeholder = "", onChangeValue = () => { }, value = "", number = false, password = false, hasError = false, errorMessage = "", editable = true
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("w-full")}>
      <TextLabel text={title} />
      <TextInputField
        value={value}
        number={number}
        placeholder={placeholder}
        onChangeValue={onChangeValue}
        password={password}
        hasError={hasError}
        errorMessage={errorMessage}
        editable={editable}
      />
    </View>
  );
}

export default FormTextInput;