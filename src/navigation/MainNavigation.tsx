import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../features/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  )
}

export default MainNavigation;