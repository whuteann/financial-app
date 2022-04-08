import { useDocument } from "@nandorojo/swr-firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { InfoIcon } from "../../../assets/SVG/SVG";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import Split from "../../components/atoms/display/Split";
import TextLabel from "../../components/atoms/typography/TextLabel";
import TutorialButton from "../../components/molecules/buttons/TutorialButton";
import SpendingCard from "../../components/molecules/display/SpendingCard";
import FormDropdownInput from "../../components/molecules/input/FormDropdownInput";
import FormTextInput from "../../components/molecules/input/FormTextInput";
import SpendingCardExamples from "../../components/templates/Profile/SpendingCardExamples";
import { USERS } from "../../constants/Firebase";
import { CURRENCIES } from "../../constants/Lists";
import { auth } from "../../functions/Firebase";
import { UserSelector } from "../../redux/reducers/Auth";
import { User } from "../../types/User";
import LoadingScreen from "../Loading";


const ProfileScreen = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);
  const [currencyRate, setCurrencyRate] = useState("RM");

  const { data: userData } = useDocument<User>(`${USERS}/${user?.id}`, {
    ignoreFirestoreDocumentSnapshotField: false,
  });

  if (!userData) { return <LoadingScreen /> }

  return (
    <Body>
      <Section>
        <TextLabel text={`Lets edit your profile ;)`} textStyle={tailwind("text-20px font-bold")} />

        <Formik
          initialValues={{
            name: userData.name,
            email: userData.email,
            currency: userData.currency || CURRENCIES[0],
            low: userData.low_spending,
            high: userData.high_spending,
          }}
          onSubmit={values => { console.log(values) }}
        >
          {({ errors, touched, values, handleSubmit, setFieldValue }) => (

            <View>
              <View style={tailwind("mt-6")} />
              <FormTextInput
                title="Name"
                placeholder="name here..."
                value={values.name}
                onChangeValue={(value) => { setFieldValue("name", value) }}
              />
              <FormTextInput
                title="Email"
                editable={false}
                placeholder="email here..."
                value={values.email}
                onChangeValue={(value) => { setFieldValue("email", value) }}
              />
              <FormDropdownInput
                value={values.currency}
                title="Currency"
                items={CURRENCIES}
                onChangeValue={(value) => { setFieldValue("currency", value) }} />

              <View style={tailwind("mt-4")} />

              <View style={tailwind("flex-row")}>
                <TextLabel text={"Spending Thresholds"} textStyle={tailwind("font-bold")} bodyStyle={tailwind("w-[90%]")} />
                <TutorialButton content={
                  <View>
                    <TextLabel text="Caution/Danger! spending thresholds" />
                    <View style={tailwind("border mb-5 mt-2 w-1/2 ")} />
                    <TextLabel text="When the amount you entered exceeds or subceeds the values you have entered, the card will indicate accordingly. Observe our examples!!" />
                  </View>
                } />
              </View>
              <Split
                left={
                  <FormTextInput
                    title="Caution"
                    placeholder={`${currencyRate}...`}
                    value={values.low}
                    number={true}
                    onChangeValue={(value) => { setFieldValue("low", value) }}
                  />}
                right={
                  <FormTextInput
                    title="Danger!"
                    placeholder={`${currencyRate}...`}
                    value={values.high}
                    onChangeValue={(value) => { setFieldValue("high", value) }}
                  />}
              />

              <View style={tailwind("mt-4")} />
              <SpendingCardExamples
                lowValue={values.low}
                highValue={values.high}
                currency={values.currency}
              />

              <View style={tailwind("mt-14")} />
              <RegularButton
                label="Update Profile"
              />
            </View>
          )}
        </Formik>

        <RegularButton
          label="Logout"
          variant="Secondary"
          onPress={() => {
            auth.signOut().then(() => {
              console.log("Signed out successfully");
            }).catch((error) => {
              console.log("Whoopsie, something happened úwù")
            });
          }}
        />

      </Section>
    </Body>
  )
}

export default ProfileScreen;