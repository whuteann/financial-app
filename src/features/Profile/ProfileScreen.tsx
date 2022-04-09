import { useDocument } from "@nandorojo/swr-firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import Split from "../../components/atoms/display/Split";
import TextLabel from "../../components/atoms/typography/TextLabel";
import TutorialButton from "../../components/molecules/buttons/TutorialButton";
import FormDropdownInput from "../../components/molecules/input/FormDropdownInput";
import FormTextInput from "../../components/molecules/input/FormTextInput";
import SpendingCardExamples from "../../components/templates/Profile/SpendingCardExamples";
import { USERS } from "../../constants/Firebase";
import { CURRENCIES } from "../../constants/Lists";
import { auth } from "../../functions/Firebase";
import { UserSelector } from "../../redux/reducers/Auth";
import { updateUser } from "../../services/UserServices";
import { User } from "../../types/User";
import LoadingScreen from "../Loading/LoadingScreen";


const ProfileScreen = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { data: userData } = useDocument<User>(`${USERS}/${user?.id}`, {
    ignoreFirestoreDocumentSnapshotField: false,
  });

  if (!userData) { return <LoadingScreen /> }

  return (
    <Body height="140%" variant="secondary">
      <Section bgColor="bg-primary" padding="py-4">
        <View style={tailwind("bg-primary")}>
          <TextLabel text={`Lets edit your profile ;)`} textStyle={tailwind("text-20px text-secondary font-bold")} />
        </View>
      </Section>
      <Section>
        <Formik
          initialValues={{
            name: userData.name,
            currency: userData.currency || CURRENCIES[0],
            caution_thres: userData.caution_thres.toString(),
            danger_thres: userData.danger_thres.toString(),
          }}
          onSubmit={values => {
            const { name, currency, caution_thres, danger_thres } = values;
            setLoading(true);
            if (Number(caution_thres) >= Number(danger_thres)) {
              setError(true);
              setLoading(false);
            } else {
              updateUser(userData.id, {
                name: name,
                currency: currency,
                caution_thres: Number(caution_thres),
                danger_thres: Number(danger_thres)
              }, () => {
                setLoading(false);
              }, () => {
                setLoading(false);
              });
              setError(false)
            }
          }}
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
                value={userData.email}
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
                    placeholder={`${values.currency}...`}
                    value={values.caution_thres}
                    number={true}
                    onChangeValue={(value) => { setFieldValue("caution_thres", value) }}
                  />}
                right={
                  <FormTextInput
                    title="Danger!"
                    placeholder={`${values.currency}...`}
                    value={values.danger_thres}
                    onChangeValue={(value) => { setFieldValue("danger_thres", value) }}
                  />}
              />
              {
                error
                  ?
                  <TextLabel text={`"Caution" value cannot be greater than or equal to "Danger!" value `} textStyle={tailwind("text-red-500 ml-2")} />
                  :
                  null
              }
              <View style={tailwind("mt-4")} />
              <SpendingCardExamples
                lowValue={values.caution_thres}
                highValue={values.danger_thres}
                currency={values.currency}
              />


              <View style={tailwind("mt-14")} />
              <RegularButton
                label="Update Profile"
                onPress={() => { handleSubmit() }}
                loading={loading}
              />
            </View>
          )}
        </Formik>

        <RegularButton
          label="Logout"
          variant="Secondary"
          onPress={() => {
            auth.signOut().then(() => {
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