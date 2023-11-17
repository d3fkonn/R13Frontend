import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './src/nav/Footer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import RestaurantsPage from './src/views/RestaurantsPage';
import OrderHistory from './src/views/OrderHistory';
import LandingScreen from './src/views/LandingPage';
import AuthenticationPage from './src/views/AuthenticationPage';
import HomeScreen from './src/views/HomePAge';
import Header from './src/nav/Header';
import LoginForm from './src/component/LoginForm';
import MenuPage from './src/views/MenuPage';




export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountSelection, setShowAccountSelection] = useState(false);

  const [userRole, setUserRole] = useState('customer'); // Default to 'customer'



  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
  })


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '##ded3d6',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#5e0f27',
    },

  });


  const [customer_id, setCustomerId] = useState(null);

  const handleLogin = (customerId) => {
    setCustomerId(customerId);
  };



  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Header userRole={userRole} setUserRole={setUserRole} />
        
          {authenticated ? (
            <Stack.Screen
              name="Login"
              component={LoginForm}
              initialParams={{ setAuthenticated }}
            />
          ) : (
            <>
              <Stack.Screen name="Main" 
              component={MainStack}
              options={{ 
                headerShown: false
                
                }} />


            </>
          )}
       
        <Footer/>
      </NavigationContainer>


    </SafeAreaProvider>

  );
}

function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={customer_id ? 'MenuPage' : 'Home'}>
      {customer_id ? (
        <>
          <Stack.Screen name="MenuPage" component={MenuPage} 
 />
 <Stack.Screen name="RestaurantsPage" component={RestaurantsPage}  initialParams={{ customer_id }}/>
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
        </>
      ) : (
        <Stack.Screen name="HomePage" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}
