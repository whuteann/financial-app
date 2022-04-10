import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { User } from "../../../types/User";
import RegularButton from "../../atoms/buttons/RegularButton";
import TextInputField from "../../atoms/input/TextInputField";
import TextLabel from "../../atoms/typography/TextLabel";
import * as Yup from "yup";
import { changePassword } from "../../../services/UserServices";
import NotifyModal from "../../molecules/display/NotifyModal";

interface changePasswordProps {
  userData: User,
}

const formSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  newPassword: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  confirmPassword: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
});

const ChangePasswordSection: React.FC<changePasswordProps> = ({
  userData
}) => {

  const tailwind = useTailwind();
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const modal = <NotifyModal
    text={"Your password has been changed!"}
    visible={modalVisible}
    setModal={setModalVisible}
  />

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);

        if (values.newPassword == values.confirmPassword) {
          changePassword(values, () => {
            setModalVisible(true);
            setError("");
            setLoading(false);
            resetForm();
          }, (error) => {
            console.log(error);
            resetForm();
            setLoading(false);
            switch (error) {
              case "The password is invalid or the user does not have a password.":
                setError("Please make sure you entered your current password correctly :'(");
                break;
              default:
                setError("Something went wrong :'(");
                break;
            }
          })
        } else {

        }
      }}
      validationSchema={formSchema}
    >
      {({ errors, touched, values, handleSubmit, setFieldValue }) => (
        <View>
          {modal}
          <TextLabel text={"Change Password"} textStyle={tailwind("font-bold")} />
          <TextInputField
            placeholder="Current password..."
            value={values.currentPassword}
            onChangeValue={(value) => { setFieldValue("currentPassword", value) }}
            hasError={errors.currentPassword && touched.currentPassword ? true : false}
            errorMessage={errors.currentPassword}
            password={true}
          />
          <TextInputField
            placeholder="New password..."
            value={values.newPassword}
            onChangeValue={(value) => { setFieldValue("newPassword", value) }}
            hasError={errors.newPassword && touched.newPassword ? true : false}
            errorMessage={errors.newPassword}
            password={true}
          />
          <TextInputField
            placeholder="Confirm password..."
            value={values.confirmPassword}
            onChangeValue={(value) => { setFieldValue("confirmPassword", value) }}
            hasError={errors.confirmPassword && touched.confirmPassword ? true : false}
            errorMessage={errors.confirmPassword}
            password={true}
          />
          {
            error
              ?
              <TextLabel text={error} textStyle={tailwind("text-red-500 ml-2 mb-2")} />
              :
              null
          }
          <RegularButton
            label="Change Password"
            loading={loading}
            onPress={() => { handleSubmit() }}
          />
        </View>
      )}
    </Formik>
  )
}

export default ChangePasswordSection;