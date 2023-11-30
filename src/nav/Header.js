import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RoleContext from '../component/RoleContext';
import { useContext } from 'react';
import AuthContext from '../component/AuthContext'
import CustContext from '../component/CustContext';
import { useNavigation } from '@react-navigation/native'; // Correct import statement


const screenWidth = Dimensions.get('screen').width

const Header = ({userRole}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  
const {setAuthenticated} = useContext(AuthContext)
const { setCustomerId } = useContext(CustContext)
const navigation = useNavigation();

  const handleFormSubmit = () => {
    if (!email.includes('@')) {
      setEmailError(true);
      return null;
    } else {
      navigation.navigate('Restaurants')
    }
  }


  const toggleUserAuth = () => {
setAuthenticated(false)
setCustomerId();
navigation.navigate('Authentication')  };

  return (
    <View style={styles.titleContainer}>

    <SafeAreaProvider>
    <Appbar.Header style={styles.header}>
    <Image source={require('../../assets/fonts/images/AppLogoV1.png')}
        style={styles.imageStyle} />
      <View>
        <TouchableOpacity onPress={toggleUserAuth}>
          <Text style={styles.logOutButton}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>      
    </Appbar.Header>
    </SafeAreaProvider>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    height:50,
    marginBottom: 5
  },
  imageStyle: {
    width: 150,
    height: 37.5,
    marginRight: 75

  },
  logOutButton: {

  },
  titleContainer: {
    height: 100, // Set the desired height for the title container
    justifyContent: 'center', // Vertically center the title
  },
  title: {
    fontSize: 18, // Adjust the font size as needed
  },
  

})

export default Header;