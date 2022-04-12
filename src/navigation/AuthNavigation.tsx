import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/Auth/LoginScreen';
import SignUpScreen from '../features/Auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

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