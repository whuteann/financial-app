import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Body from "../../components/atoms/display/Body";
import TextLabel from "../../components/atoms/typography/TextLabel";
import { AuthNavigationProps } from "../../navigation/NavigationProps/NavigationProps";
import * as Yup from "yup";
import { getWindow } from "../../helpers/Generichelper";
import FormTextInput from "../../components/molecules/input/FormTextInput";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import LinkText from "../../components/atoms/typography/LinkText";
import FormDropdownInput from "../../components/molecules/input/FormDropdownInput";
import { CURRENCIES } from "../../constants/Lists";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  email: Yup.string().email("Please enter a valid email address ").required("Required"),
  password: Yup.string().min(6, "Must be at least 6 characters").required("Required")
});

const SignUpScreen = ({ navigation }: AuthNavigationProps<"SignUp">) => {

  const tailwind = useTailwind();
  const { height } = getWindow();

  const onSignUp = (values: { email: string, password: string }) => {
    console.log(values);
    navigation.navigate("Login");
  }

  return (
    <Body variant="secondary">
      <View style={[
        tailwind('items-center flex flex-row justify-center w-full'),
        { 'height': height }  // This is not good as it blocks the screen from scrolling on app but no alternatives for now
      ]}>
        <View>
          <TextLabel text={`Don't worry!`} textStyle={tailwind("text-20px font-bold")} />
          <TextLabel text={`We'll get you all signed up :)`} textStyle={tailwind("text-20px font-bold")} />
          <View style={tailwind("border mb-5 mt-2 w-1/2 ")} />

          <View style={tailwind("mt-6")} />

          <Formik
            initialValues={{
              name: '',
              currency: '',
              email: '',
              password: '',
            }}
            onSubmit={values => { onSignUp(values) }}
            validationSchema={signUpSchema}
          >
            {({ errors, touched, values, handleSubmit, setFieldValue }) => (
              <View style={tailwind("items-center w-full")}>
                <FormTextInput
                  title="Name (So that we know who you are!)"
                  placeholder="name..."
                  value={values.name}
                  onChangeValue={(value) => { setFieldValue("name", value) }}
                  hasError={errors.name && touched.name ? true : false}
                  errorMessage={errors.name}
                />
                <FormDropdownInput
                  title="Currency Rate"
                  value={values.currency}
                  items={CURRENCIES}
                  onChangeValue={(value) => { setFieldValue("currency", value) }}
                  hasError={errors.currency && touched.currency ? true : false}
                  errorMessage={errors.currency}
                />
                <FormTextInput
                  title="Email"
                  placeholder="email@email.com"
                  value={values.email}
                  onChangeValue={(value) => { setFieldValue("email", value) }}
                  hasError={errors.email && touched.email ? true : false}
                  errorMessage={errors.email}
                />
                <FormTextInput
                  title="Password"
                  placeholder="password..."
                  password={true}
                  value={values.password}
                  onChangeValue={(value) => { setFieldValue("password", value) }}
                  hasError={errors.password && touched.password ? true : false}
                  errorMessage={errors.password}
                />

                <View style={tailwind("mt-10")} />
                <RegularButton label="SignUp" onPress={() => { handleSubmit() }} />

                <View style={tailwind("w-[90%] flex-wrap")}>
                  <LinkText text="Already have an account? Log in!!" onPress={() => { navigation.navigate("Login") }} textStyle={tailwind("text-center")} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Body>
  )
}

export default SignUpScreen;