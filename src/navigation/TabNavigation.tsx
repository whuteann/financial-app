import Dashboard from '../features/Dashboard/Dashboard';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../features/Profile/ProfileScreen';
import BottomTab from '../components/molecules/buttons/BottomTab';
import { CalendarIcon, HomeIcon, ProfileIcon } from '../../assets/SVG/SVG';
import { useTailwind } from 'tailwind-rn/dist';
import MonthIndexScreen from '../features/Listing/MonthIndexScreen';
const Tab = createBottomTabNavigator();


const TabNavigation = () => {

  const tailwind = useTailwind();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{
          position: "absolute",
          height: 70,
        }, tailwind("bg-highlight")]
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        tabBarIcon: ({ focused }) => (
          <BottomTab label='Dashboard' icon={<HomeIcon height={20} width={20} />} />
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <BottomTab label='Profile' icon={<ProfileIcon height={20} width={20} />} />
        )
      }} />

      <Tab.Screen name="Month" component={MonthIndexScreen} options={{
        tabBarIcon: ({ focused }) => (
          <BottomTab label='Months' icon={<CalendarIcon height={20} width={20} />} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigation;