import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../atoms/buttons/RegularButton";
import TextInputField from "../../atoms/input/TextInputField";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { UserSelector } from "../../../redux/reducers/Auth";
import { createSpendingTab } from "../../../services/SpendingServices";
import LoadingScreen from "../../../features/Loading/LoadingScreen";
import { revalidateCollection } from "@nandorojo/swr-firestore";
import { SPENDINGS, TABS } from "../../../constants/Firebase";
import TextLabel from "../../atoms/typography/TextLabel";

const formSchema = Yup.object().shape({
  description: Yup.string().max(30, "Your description is too long!").required("Required"),
  amount: Yup.string().max(10, "Too large of a value! >.<").required("Required")
});

const AddSpendingSection = () => {

  const user = useSelector(UserSelector);
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <LoadingScreen />

  return (
    <Formik
      initialValues={{
        description: "",
        amount: ""
      }}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        if (Number(values.amount) < 0) {
          setError("Please enter a positive integer :')")
          setLoading(false);
        } else {
          createSpendingTab(user.id, values, (docID) => {
            resetForm();
            revalidateCollection(`${SPENDINGS}/${docID}/${TABS}`);
            setLoading(false);
          }, (error) => {
            resetForm();
            setError(error);
            setLoading(false);
          })
        }
      }}
      enableReinitialize={true}
      validationSchema={formSchema}
    >
      {({ errors, touched, values, handleSubmit, setFieldValue }) => (
        <View style={tailwind("mt-2")}>
          <TextInputField
            placeholder="A short description... "
            value={values.description}
            onChangeValue={(value) => { setFieldValue("description", value) }}
            hasError={errors.description && touched.description ? true : false}
            errorMessage={errors.description}
          />
          <TextInputField
            placeholder={`amount(${user.currency})`}
            number={true}
            value={`${user.currency} ${values.amount}`}
            onChangeValue={(value) => { setFieldValue("amount", value.replace("RM", "").trim()) }}
            hasError={errors.amount && touched.amount ? true : false}
            errorMessage={errors.amount}
          />
          {
            error
              ?
              <TextLabel text={error} textStyle={tailwind("text-red-500 ml-2")} />
              :
              null
          }
          <RegularButton
            label="Add!"
            onPress={() => { handleSubmit(); }}
            loading={loading}
          />
        </View>
      )}
    </Formik>
  )
}

export default AddSpendingSection;