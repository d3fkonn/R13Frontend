import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
const screenWidth = Dimensions.get('screen').width


const Footer = ({ state, descriptors, navigation }) =>(
  
  <View style={styles.footerContainer}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            
            navigation.navigate(route.name);

          }
          }
          style={styles.footerIcon}
        >
    
    

          <Ionicons
            name={options.tabBarIconName}
            size={25}
            color={isFocused ? '#007bff' : '#ccc'} />

          < Text style={{ color: isFocused ? '#987bff' : '#ccc' }}>
            {options.tabBarLabel}
          </Text >
        </TouchableOpacity >
       ); 
      })}
</View>
)
export default Footer;


const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Add space between items
    height: 80,
    width: screenWidth,
    alignItems: 'center', // Align items in the center vertically
  },
  footerIcon: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 1, // Each TouchableOpacity takes equal width
    alignItems: 'center', // Align items in the center horizontally
  },
})

