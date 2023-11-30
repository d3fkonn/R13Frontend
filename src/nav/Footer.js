import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../views/HomePAge';
import AuthenticationPage from '../views/AuthenticationPage';
import OrderHistory from "../views/OrderHistory";
import RestaurantsPage from '../views/RestaurantsPage';
import MenuPage from '../views/MenuPage';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../component/AuthContext';
import CustContext from '../component/CustContext';
import RoleContext from '../component/RoleContext';

const Footer = () => {
  const Tab = createBottomTabNavigator();
  const { authenticated } = useContext(AuthContext);
const {customerId} = useContext(CustContext)
const {userRole} = useContext(RoleContext)
  return (
    <Tab.Navigator
      initialRouteName={authenticated ? 'Home' : 'Authentication'}
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

          if (rn === 'Login') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === 'Restaurants') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (rn === "Order History") {
            iconName = focused ? 'cloudy' : 'cloudy-outline';
          } else if (rn === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
       {authenticated ? (
        <>
          <Tab.Screen name="Restaurants" component={RestaurantsPage} />
          <Tab.Screen name="Order History" component={OrderHistory} initialParams={{ customerId: customerId, userRole: userRole }} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="MenuPage" component={MenuPage} />
        </>
       ) : (
        <Tab.Screen name="Authentication" component={AuthenticationPage} />
       )}
    </Tab.Navigator>
  );
};

export default Footer;
