import { Formik } from "formik";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import TextLabel from "../../components/atoms/typography/TextLabel";
import FormTextInput from "../../components/molecules/input/FormTextInput";
import { getWindow } from "../../helpers/Generichelper";
import { AuthNavigationProps } from "../../navigation/NavigationProps/NavigationProps";
import * as Yup from "yup";
import LinkText from "../../components/atoms/typography/LinkText";
import { login } from "../../services/AuthServices";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address ").required("Required"),
  password: Yup.string().min(6, "Must be at least 6 characters").required("Required")
});

const LoginScreen = ({ navigation }: AuthNavigationProps<"Login">) => {

  const tailwind = useTailwind();
  const { height } = getWindow();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = (values: { email: string, password: string }) => {
    setLoading(true);
    const { email, password } = values;
    login(email, password, () => {
      setLoading(false);
      //handle buth Auth state
    }, (err: any) => {
      setLoading(false);
      switch (err.code) {
        case "auth/wrong-password":
          setError("Wrong username or password :'(");
          break;
        case "auth/user-not-found":
          setError("User not found :0 please sign up!");
          break;
        default:
          setError("Something went wrong :(");
          break;
      }
    })
  }

  return (
    <Body topSpace={false} bottomSpace={false}>
      <View style={[
        tailwind('items-center flex flex-row justify-center w-full'),
        { 'height': height }  // This is not good as it blocks the screen from scrolling on app but no alternatives for now
      ]}>
        <View>
          <View style={tailwind("items-center mb-10 flex-row justify-center")}>
            <Image
              style={{ height: 100, width: 100 }}
              source={require("../../../assets/Logo5.png")}
            />
            <View style={tailwind("pt-5 ml-5")}>
              <TextLabel text={`Welcome!`} textStyle={tailwind("text-20px font-bold")} />
              <TextLabel text={` Let's log you in! :)`} textStyle={tailwind("text-20px font-bold")} />
              <View style={tailwind("border mb-5 mt-2 w-1/2 ")} />
            </View>
          </View>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => { onLogin(values) }}
            validationSchema={loginSchema}
          >
            {({ errors, touched, values, handleSubmit, setFieldValue }) => (
              <View style={tailwind("items-center w-full")}>
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
                {
                  error
                    ?
                    <TextLabel text={error} textStyle={tailwind("text-red-500")} />
                    :
                    null
                }
                <View style={tailwind("mt-10")} />
                <RegularButton
                  label="Login!"
                  loading={loading}
                  onPress={() => { handleSubmit() }}
                />

                <View style={tailwind("w-[80%] flex-wrap")}>
                  <LinkText text="Don't have an account? Sign up!!" onPress={() => { navigation.navigate("SignUp") }} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Body>
  )
}

export default LoginScreen;