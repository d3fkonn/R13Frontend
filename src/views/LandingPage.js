import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LoginForm from '../component/LoginForm';
const screenWidth = Dimensions.get('screen').width
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const LandingScreen = () => {

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image source={require('../../assets/fonts/images/AppLogoV2.png')} style={styles.deliveryIcon} />
          <View style={styles.addressContainer}>
            <Text style={styles.welcomeText}> Welcome Back </Text>
            <Text style={styles.loginText}> Login to begin </Text>
            <LoginForm />
          </View>
        </View>

      </View>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  navigation: {
    flex: 2,
    backgroundColor: 'red'
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  deliveryIcon: {
    width: 260,
    height: 120,
    alignItems: 'center',
    position: 'relative',
    top: -50
  },
  addressContainer: {
    width: screenWidth - 100,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginText: {
    fontSize: 10
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan'
  }

});
export default LandingScreen