import { useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import RegularButton from "../../components/atoms/buttons/RegularButton";
import Body from "../../components/atoms/display/Body";
import Section from "../../components/atoms/display/Section";
import TextLabel from "../../components/atoms/typography/TextLabel";
import ChangePasswordSection from "../../components/templates/Profile/ChangePasswordSection";
import UpdateProfileSection from "../../components/templates/Profile/UpdateProfileSection";
import { USERS } from "../../constants/Firebase";
import { auth } from "../../functions/Firebase";
import { UserSelector } from "../../redux/reducers/Auth";
import { User } from "../../types/User";
import LoadingScreen from "../Loading/LoadingScreen";


const ProfileScreen = () => {

  const tailwind = useTailwind();
  const user = useSelector(UserSelector);

  const { data: userData } = useDocument<User>(`${USERS}/${user?.id}`, {
    ignoreFirestoreDocumentSnapshotField: false,
  });

  if (!userData) { return <LoadingScreen /> }

  return (
    <Body height="115%" variant="secondary">
      <Section bgColor="bg-primary" padding="py-4">
        <View style={tailwind("bg-primary")}>
          <TextLabel text={`Lets edit your profile ;)`} textStyle={tailwind("text-20px text-secondary font-bold")} />
        </View>
      </Section>
      <Section>

        <UpdateProfileSection userData={userData} />
        <View style={tailwind("mt-7")} />
        <ChangePasswordSection userData={userData} />

        <View style={tailwind("mt-7")} />
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