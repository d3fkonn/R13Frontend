// Import our React and React Native dependencies.
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import AuthContext from '../component/AuthContext';
import CustContext from '../component/CustContext';

// Gather screen dimensions.
const screenWidth = Dimensions.get('screen').width

// Create our local screen function.
const AuthenticationPage = (customerId) => {
  const { setAuthenticated } = useContext(AuthContext);
const {setCustomerId} = useContext(CustContext)

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
const [loginError, setLoginError] = useState(false)
  const onChangeEmail = email => setEmail(email);
  const onChangePassword = password => setPassword(password);
  //NEW SHIT BELOW UNTIL SIMULATED LOGIN

  // let setAuthenticated;
  // if (route && route.params) {
  //   setAuthenticated = route.params.setAuthenticated;
  // }
 


  const handleFormSubmit = async () => {
  
    const newPerson = {
       email: email,
        password: password 
      };


    if (!email.includes('@')) {
      setEmailError(true);
    }
    else {

      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (response.ok) {

        const data = await response.json()
        console.log(data)
const customerAuth = data.customer_id
        setAuthenticated(true); // Set authenticated state to true
setCustomerId(customerAuth)
console.log("paramID", customerId)
        navigation.navigate('Restaurants', {
          customer_id: data.customer_id,

        }); // Navigate to HomeScreen
        return;
      }else{
        setLoginError(true)
        setPassword("")
      }
    }
    // Simulating a successful login. You can replace this with your actual login logic.
  }


  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('../../assets/fonts/Oswald-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.authContainer}>
          <View style={styles.authBody}>
            <Image source={require('../../assets/fonts/images/AppLogoV2.png')} style={styles.deliveryIcon} />
            <View style={styles.authForm}>
              <View style={styles.authFormText}>
                <Text style={styles.welcomeText}>Welcome Back </Text>
                <Text>Login to Begin</Text>
                <Text></Text>
              </View>

              <View style={styles.authFormInput}>
                <Text style={styles.authFormInputText}> Email: </Text>
                <TextInput
                  label='Enter your primary email here.'
                  value={email}
                  onChangeText={onChangeEmail}
                  style={styles.emailInput}
                  autoCapitalize='none'
                />
                <HelperText
                  type='error'
                  visible={emailError}
                >
                  Email address is invalid!
                </HelperText>
                <HelperText
                  type='error'
                  visible={loginError}
                >
                  Incorrect email or password!
                </HelperText>
                <Text style={styles.authFormInputText}>Password:</Text>
                <TextInput
                  label='*****************'
                  value={password}
                  onChangeText={onChangePassword}
                  secureTextEntry
                  autoCapitalize='none'
                />
              </View>
              <Button
                title='Log In'
                color='#DA583B'
                onPress={handleFormSubmit}
                style={styles.logInButton}
              />
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    overflowX: 'auto',
    overflowY: 'auto'
  },
  deliveryIcon: {
    width: 260,
    height: 120,
    position: 'relative',
    top: -75,
    left: 10,
  },
  authBody: {
    flex: 9,
    justifyContent: 'center'
  },
  authForm: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: screenWidth - 70,
    position: 'relative',
    top: -50,
    padding: '5%'
  },
  authFormInput: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  authFormInputText: {
    marginTop: '5%'
  },
  welcomeText: {
    fontSize: 20,
    // fontFamily:'Oswald-Regular'

  }

})

export default AuthenticationPage;