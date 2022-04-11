import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { CURRENCIES } from "../../../constants/Lists";
import { updateUser } from "../../../services/UserServices";
import { User } from "../../../types/User";
import RegularButton from "../../atoms/buttons/RegularButton";
import Split from "../../atoms/display/Split";
import TextLabel from "../../atoms/typography/TextLabel";
import TutorialButton from "../../molecules/buttons/TutorialButton";
import FormDropdownInput from "../../molecules/input/FormDropdownInput";
import FormTextInput from "../../molecules/input/FormTextInput";
import SpendingCardExamples from "./SpendingCardExamples";
import * as Yup from "yup";

interface updateProfileProps {
  userData: User,
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  caution_thres: Yup.string().required("Required"),
  danger_thres: Yup.string().required("Required"),
});

const UpdateProfileSection: React.FC<updateProfileProps> = ({
  userData
}) => {

  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Formik
      initialValues={{
        name: userData.name,
        currency: userData.currency || CURRENCIES[0],
        caution_thres: userData.caution_thres ? userData.caution_thres.toString() : "",
        danger_thres: userData.danger_thres ? userData.danger_thres.toString() : "",
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
      validationSchema={formSchema}
    >
      {({ errors, touched, values, handleSubmit, setFieldValue }) => (

        <View>
          <View style={tailwind("mt-6")} />
          <FormTextInput
            title="Name"
            placeholder="name here..."
            value={values.name}
            onChangeValue={(value) => { setFieldValue("name", value) }}
            hasError={errors.name && touched.name ? true : false}
            errorMessage={errors.name}
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
            onChangeValue={(value) => { setFieldValue("currency", value) }}
            hasError={errors.currency && touched.currency ? true : false}
            errorMessage={errors.currency}
          />

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
                hasError={errors.caution_thres && touched.caution_thres ? true : false}
                errorMessage={errors.caution_thres}
              />}
            right={
              <FormTextInput
                title="Danger!"
                placeholder={`${values.currency}...`}
                value={values.danger_thres}
                onChangeValue={(value) => { setFieldValue("danger_thres", value) }}
                hasError={errors.danger_thres && touched.danger_thres ? true : false}
                errorMessage={errors.danger_thres}
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


          <View style={tailwind("mt-7")} />
          <RegularButton
            label="Update Profile"
            onPress={() => { handleSubmit() }}
            loading={loading}
          />
        </View>
      )}
    </Formik>
  )
}

export default UpdateProfileSection;