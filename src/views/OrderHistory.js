import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const OrderHistory = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>
          Test Screen
        </Text>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigation: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%'
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default OrderHistory;