import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../views/HomePAge';
import AuthenticationPage from '../views/AuthenticationPage';
import OrderHistory from "../views/OrderHistory";
import RestaurantsPage from '../views/RestaurantsPage';
import MenuPage from '../views/RestaurantMenu';
const Tab = createBottomTabNavigator();

// Screen names.
const loginName = 'Login';
const restName = 'Restaurants';
const histName = 'Order History';
const homeName = 'Home';
const menuName = 'Menu';

const Footer = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: 'bold'
        },
        tabBarStyle: {
          height: 90
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const rn = route.name;

          if (rn === loginName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === restName) {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (rn === histName) {
            iconName = focused ? 'cloudy' : 'cloudy-outline';
          } else if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === menuName) {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name={loginName} component={AuthenticationPage} />
      <Tab.Screen name={restName} component={RestaurantsPage} />
      <Tab.Screen name={histName} component={OrderHistory} />
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={menuName} component={MenuPage} />
    </Tab.Navigator>
  );
};

export default Footer;
