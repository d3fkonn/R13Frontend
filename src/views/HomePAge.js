import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width

export const HomeScreen = () => {

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
 
        <View style={styles.body}>
          <Text> Home Screen </Text>
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
  footer: {
    flex: 1,
    backgroundColor: 'cyan'
  }

});

export default HomeScreen;