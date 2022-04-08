import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';

export default function RootNavigation() {
  return (
    <NavigationContainer>
      {/* <TabNavigation /> */}
      <AuthNavigation />
    </NavigationContainer>
  );
}