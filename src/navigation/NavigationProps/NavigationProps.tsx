import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: NativeStackNavigationProp<AuthRoutes, RouteName>;
  route: RouteProp<AuthRoutes, RouteName>;
}

export type AuthRoutes = {
  Login: undefined,
  SignUp: undefined,
  Tabs: undefined
}