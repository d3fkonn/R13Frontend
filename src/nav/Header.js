import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Button, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RoleContext from '../component/RoleContext';
import { useContext } from 'react';
import AuthContext from '../component/AuthContext'
import CustContext from '../component/CustContext';
import { useNavigation } from '@react-navigation/native'; // Correct import statement
import { useRoute  } from '@react-navigation/native';


const screenWidth = Dimensions.get('screen').width
const Header = ({}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

const {setAuthenticated} = useContext(AuthContext)
const { setCustomerId } = useContext(CustContext)
const navigation = useNavigation();
const {authenticated} = useContext(AuthContext)
const {userRole} = useContext(RoleContext)
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
  };
  const firstLetter = userRole.charAt(0)

  const firstLetterCap = firstLetter.toUpperCase()

  const remainingLetters = userRole.slice(1)

  const capitalizedWord = firstLetterCap + remainingLetters

  return (
    <View style={styles.titleContainer}>

    <SafeAreaProvider>
    <Appbar.Header style={styles.header}>
    <Image source={require('../../assets/fonts/images/AppLogoV1.png')}
        style={styles.imageStyle} />
                <Text style={{right:'90%'}}>{capitalizedWord}</Text>
<View></View>
      <View>{authenticated ? ( <Pressable style={styles.logOutButton} onPress={toggleUserAuth}>
          <Text style={styles.logOutText}>
            Log Out
          </Text>
        </Pressable>):(
          <></>
       )}
       
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

  },logOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: '50%',
    backgroundColor: '#DA583B',
    borderColor: '#222126',
    height: 40,
    width:'auto',
    right:'10%'
  },
  logOutText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.50,
    color: 'white',
    justifyContent: 'center', // Vertically center the text

  },
  titleContainer: {
    height: 100, // Set the desired height for the title container
    justifyContent: 'center', // Vertically center the title
    flexDirection:'row',
    width:'100%'
  },
  title: {
    fontSize: 18, // Adjust the font size as needed
  },
  

})

export default Header;