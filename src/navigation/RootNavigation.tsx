import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import { useUserContext } from '../providers/UserProvider';
import { AUTH_LOADING, AUTH_LOGGED_IN } from '../constants/Auth';
import LoadingScreen from '../features/Loading';
import TabNavigation from './TabNavigation';

export default function RootNavigation() {
  const userContext = useUserContext();

  if (userContext?.status.match(AUTH_LOADING)) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      {
        userContext?.status == AUTH_LOGGED_IN
          ?
          <TabNavigation />
          :
          <AuthNavigation />
      }
    </NavigationContainer>
  );
}