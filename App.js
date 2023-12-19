import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
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
import UserSelectionPage from './src/views/AccountPage';
import AuthContext from './src/component/AuthContext';
import CustContext from './src/component/CustContext';
import RoleContext from './src/component/RoleContext';
import CourierContext from './src/component/CourierContext';
import UserContext from './src/component/UserContext';
import DeliveryHistory from './src/views/DeliveryPage';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message/lib';


export default function App() {
  const Tab = createBottomTabNavigator();
  const [authenticated, setAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState(); // Initialize customerId
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [courierID, setCourierID] = useState()
  const [userRole, setUserRole] = useState(''); // Default to 'customer'
  const [userId, setUserId] = useState();


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
      <PaperProvider>

        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          <CustContext.Provider value={{ customerId, setCustomerId }}>
            <RoleContext.Provider value={{ userRole, setUserRole }}>
              <CourierContext.Provider value={{ courierID, setCourierID }}>
                <UserContext.Provider value={{ userId, setUserId }}>
                  <NavigationContainer>
                    <Header userRole={userRole} setUserRole={setUserRole} />
                    {authenticated ? (


                      <Tab.Navigator

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


                        })} tabBar={(props) => <Footer {...props} />
                        }
                      >

                        {userRole == 'courier' ? (
                          <Tab.Screen name='DeliveryPage' component={DeliveryHistory} options={{ tabBarIconName: 'search', tabBarLabel: 'Deliveries', headerShown: false }} />
                        ) : (
                          <>
                          </>
                        )}
                        {userRole == 'customer' ? (
                          <>
                            <Tab.Screen name="Restaurants" component={RestaurantsStack} options={{ tabBarIconName: 'restaurant', tabBarLabel: 'Restaurants', headerShown: false }} />
                            <Tab.Screen name="OrderHistory" component={OrderHistory} options={{ tabBarIconName: 'cloud', tabBarLabel: 'Order History', headerShown: false }} />

                          </>
                        ) : (
                          <>
                          </>
                        )}

                        {/* <Tab.Screen name="HomePage" component={HomeScreen} options={{ tabBarIconName: 'home', tabBarLabel: 'Home', headerShown: false }} /> */}
                        <Tab.Screen name="AccountsPage" component={UserSelectionPage} options={{ tabBarIconName: 'menu', tabBarLabel: 'Accounts Page', headerShown: false }} />
                      </Tab.Navigator>
                    ) : (


                      <AuthenticationPage />

                    )}




<Toast/>

                  </NavigationContainer>
                </UserContext.Provider>
              </CourierContext.Provider>
            </RoleContext.Provider>
          </CustContext.Provider>

        </AuthContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>

  );
}

function RestaurantsStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName={'RestaurantsPage'} >
      <Tab.Screen name="RestaurantsPage" component={RestaurantsPage} options={{
        headerShown: false, tabBarStyle: { display: "none" },
      }} />

      <Tab.Screen name="MenuPage" component={MenuPage} options={{
        headerShown: false, tabBarStyle: { display: "none" },
      }}
      />


    </Tab.Navigator>
  );
}

// const App = () => {
//   const [isLoggedIn: boolean, setIsLoggedIn] = useState(initialState: false); const [fontsLoaded: boolean] = useFonts(map: {
//   });
//   'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'), 'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
// if (!fontsLoaded) return <View> <Text>Loading...</Text></View>;
//   return (
//     <UserProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         {isLoggedIn && <Header onLogout={(): void => setIsLoggedIn(value: false)} />} <NavigationContainer>
//           fisLoggedIn? (
//           <LoginScreen onLogin ((): void =>setIsLoggedIn(value: true)} />
//           ): (
//           <Tab.Navigator
//             screenOptions={{
//               tabBarStyle: {
//                 backgroundColor: '#f2f2f2',
//                 paddingVertical: 18,
//                 paddingHorizontal: 28,
//                 G
//               }
//             }
//             }}
//           tabBar={(props: BottomTabBarProps) => <Footer {...props} />}
//           <Tab.Screen
//           />
//           name="Restaurants"
//           component={RestaurantsStack}
//           options={{ tabBarIconName: 'restaurant', tabBarLabel: 'Restaurants', headerShown: false }}
//           <Tab.Screen
//           />
//           name="OrdersHistoryScreen"
//           component {OrdersHistoryScreen}
//           options={{ tabBarIconName: 'list', tabBarLabel: 'Order History', header Shown: false }}
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaView>
// </UserProvider >
// );
// };