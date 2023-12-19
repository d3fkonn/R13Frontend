// Import our React and React Native dependencies.
import React, { useState, useEffect, useContext, } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, Modal, Pressable } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../component/AuthContext';
import CustContext from '../component/CustContext';
import UserContext from '../component/UserContext';
import CourierContext from '../component/CourierContext';
import RoleContext from '../component/RoleContext';
// Gather screen dimensions.
const screenWidth = Dimensions.get('screen').width

// Create our local screen function.
const AuthenticationPage = (customerId) => {
  const { setAuthenticated } = useContext(AuthContext);
  const { setCustomerId } = useContext(CustContext)
  const { setCourierID } = useContext(CourierContext)
  const { setUserId } = useContext(UserContext)
  const { setUserRole } = useContext(RoleContext)
  const navigation = useNavigation();
  const [email, setEmail] = useState('erica.ger@gmail.com');
  const [password, setPassword] = useState('password');
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false)
  const onChangeEmail = email => setEmail(email);
  const onChangePassword = password => setPassword(password);

  const [accountModalVisible, setAccountModalVisible] = useState(false)
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
        console.log("authData", data)
        const customerAuth = data.customer_id
        const courierAuth = data.courier_id
        setUserId(data.user_id)
        setCustomerId(customerAuth)
        setCourierID(courierAuth)
        console.log("customerAuth", customerAuth, "courierAuth", courierAuth)
       
        if (data.customer_id == null) {
          setAuthenticated(true)
          setUserRole('courier')
        } else if (data.courier_id == null) {
          setAuthenticated(true)
          setUserRole('customer')
        } else {
          setAccountModalVisible(true)
        } // Navigate to HomeScreen
      } else {
        console.error(response.status, newPerson)
        setLoginError(true)
        setPassword('')
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



        <View>

          <Modal visible={accountModalVisible} animationType="slide" transparent={true} style={styles.modal}>
            <View style={styles.modalView}>
              <Pressable
                color='#DA583B'
                style={styles.accountButton}
                onPress={() => {
                  setCustomerId()
                  setUserRole('courier')
                  setAuthenticated(true)}}
              >
                <Text style={styles.accountText}>Login to Courier Account</Text>
              </Pressable>

              <Pressable
                style={styles.accountButton}

                onPress={() => {
                  setAuthenticated(true); // Set authenticated state to true
                  setCourierID();
                  setUserRole('customer')
                 
                }}
              > 
              <Text style={styles.accountText}>Login to Customer Account</Text>
              </Pressable>
            </View>
          </Modal>
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
    left: 30,
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

  }, modalView: {
    left: '10%',
    top: '20%',
    zIndex: 1,
    position: 'relative',
    height: '65%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: "#DA583B",
    borderWidth: 4,
    padding: 6,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',


  }, modal: {

    zIndex: 1,
    position: 'relative',
    backgroundColor: 'white',

  }, accountButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#DA583B',
    borderColor: '#222126',
    margin: 50,
    height: 50,
    width: '90%',
  },accountText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


})

export default AuthenticationPage;