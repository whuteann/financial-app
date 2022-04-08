import Dashboard from '../features/Dashboard/Dashboard';


import { useTailwind } from 'tailwind-rn/dist';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/Auth/LoginScreen';
import SignUpScreen from '../features/Auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {

  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation;