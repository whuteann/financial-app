import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export interface MainNavigationProps<RouteName extends keyof MainRoutes> {
  navigation: NativeStackNavigationProp<MainRoutes, RouteName>;
  route: RouteProp<MainRoutes, RouteName>;
}

export type MainRoutes = {
  Dashboard: undefined
}