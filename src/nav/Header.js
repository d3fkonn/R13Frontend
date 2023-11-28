import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Gather screen dimensions.
const screenWidth = Dimensions.get('screen').width

const Header = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  
  const [userRole, setUserRole] = useState('customer'); // Default to 'customer'

  const handleFormSubmit = () => {
    if (!email.includes('@')) {
      setEmailError(true);
      return null;
    } else {
      navigation.navigate('Restaurants')
    }
  }
  const toggleUserRole = () => {
    setUserRole(prevRole => (prevRole === 'customer' ? 'courier' : 'customer'));
  };

  return (
    <View style={styles.titleContainer}>

    <SafeAreaProvider>
    <Appbar.Header style={styles.header}>
    <Image source={require('../../assets/fonts/images/AppLogoV1.png')}
        style={styles.imageStyle} />
      <View>
        <TouchableOpacity onPress={toggleUserRole}>
          <Text style={styles.toggleButton}>
            {userRole === 'customer' ? 'Switch to Courier' : 'Switch to Customer'}
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