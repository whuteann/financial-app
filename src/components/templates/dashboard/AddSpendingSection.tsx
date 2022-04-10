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

const formSchema = Yup.object().shape({
  description: Yup.string().max(30, "Your description is too long!").required("Required"),
  amount: Yup.string().required("Required")
});

const AddSpendingSection = () => {

  const user = useSelector(UserSelector);
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);

  if (!user) return <LoadingScreen />

  return (
    <Formik
      initialValues={{
        description: "",
        amount: ""
      }}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        createSpendingTab(user.id, values, (docID) => {
          resetForm();
          revalidateCollection(`${SPENDINGS}/${docID}/${TABS}`);
          setLoading(false);
        }, () => {
          resetForm();
          setLoading(false);
        })
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