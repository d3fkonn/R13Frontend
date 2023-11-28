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
import { Provider } from 'react';

import AuthenticationPage from './src/views/AuthenticationPage';
import HomeScreen from './src/views/HomePAge';
import Header from './src/nav/Header';
import LoginForm from './src/component/LoginForm';
import MenuPage from './src/views/MenuPage';

import AuthContext from './src/component/AuthContext';
import CustContext from './src/component/CustContext';



export default function App() {
  const Tab = createBottomTabNavigator();
  const [authenticated, setAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState(null); // Initialize customerId
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
  const Stack = createNativeStackNavigator();

  const handleLogin = (customerId) => {
    setAuthenticated(true);
  };



  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <CustContext.Provider value={{ customerId, setCustomerId }}>

          <NavigationContainer>
            <Header userRole={userRole} setUserRole={setUserRole} />
            {authenticated ? (<>
              <Stack.Screen
                name="Authentication"
                component={AuthenticationPage} />
            </>
            ) : (
              <>
                <Stack.Screen name="Main"
                  component={MainStack}
                  options={{
                    headerShown: false

                  }} />


              </>)}




            <Footer />
          </NavigationContainer>
        </CustContext.Provider>

      </AuthContext.Provider>

    </SafeAreaProvider>

  );
}

function MainStack() {
  const Stack = createNativeStackNavigator();
  const { authenticated } = useContext(AuthContext);
  const { customerId } = useContext(CustContext);

  return (
    <Stack.Navigator initialRouteName={customerId ? 'MenuPage' : 'Home'}>
      {authenticated ? (
        <>
          <Stack.Screen name="MenuPage" component={MenuPage}            initialParams={{ customerId: customerId }} // Pass customerId as initialParams
/>
          <Stack.Screen name="RestaurantsPage" component={RestaurantsPage}             initialParams={{ customerId: customerId }} // Pass customerId as initialParams
/>
          <Stack.Screen name="OrderHistory" component={OrderHistory} userRole={userRole}            initialParams={{ customerId: customerId }} // Pass customerId as initialParams
 />
        </>
      ) : (
        <Stack.Screen name="HomePage" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}
