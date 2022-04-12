import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonthIndexScreen from '../features/Listing/MonthIndexScreen';
import SpendingIndexScreen from '../features/Listing/SpendingIndexScreen';


const Stack = createNativeStackNavigator();

const IndexStackNavigation = () => {


  return (
    <Stack.Navigator
      initialRouteName="MonthIndex"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MonthIndex" component={MonthIndexScreen} />
      <Stack.Screen name="SpendingIndex" component={SpendingIndexScreen} />
    </Stack.Navigator>
  )
}

export default IndexStackNavigation;