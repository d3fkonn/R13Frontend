import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuPage from './MenuPage';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Correct import statement

import { useFonts } from 'expo-font';

// Import our images.
import Greek from '../../assets/fonts/images/restaurants/cuisineGreek.jpg';
import Japanese from '../../assets/fonts/images/restaurants/cuisineJapanese.jpg';
import Pasta from '../../assets/fonts/images/restaurants/cuisinePasta.jpg';
import Pizza from '../../assets/fonts/images/restaurants/cuisinePizza.jpg';
import Southeast from '../../assets/fonts/images/restaurants/cuisineSoutheast.jpg';
import Viet from '../../assets/fonts/images/restaurants/cuisineViet.jpg';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get('screen').width;

const RestaurantsPage = () => {
  const ratingOptions = ['Select', '*', '**', '***', '****', '*****'];
  const priceOptions = ['Select', '*', '**', '***', '****', '*****'];
  const [selectedRating, setSelectedRating] = useState('Select');
  const [selectedPrice, setSelectedPrice] = useState('Select');
  const [isRatingDropdownVisible, setIsRatingDropdownVisible] = useState(false);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  

  const navigation = useNavigation(); // Get the navigation object

  const toggleRatingDropdown = () => {
    setIsRatingDropdownVisible(!isRatingDropdownVisible);
    setIsPriceDropdownVisible(false);
  };

  const togglePriceDropdown = () => {
    setIsPriceDropdownVisible(!isPriceDropdownVisible);
    setIsRatingDropdownVisible(false);
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    setIsRatingDropdownVisible(false);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setIsPriceDropdownVisible(false);
  };

  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('../../assets/fonts/Oswald-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }



  const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/restaurants/show`);
    if (response.ok) {
      const data = await response.json();
      setRestaurantData(data);
    } else {
      console.error('Error fetching data:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
  const filteredRestaurants = restaurantData.filter((restaurant) => {
    if (selectedRating === 'Select' && selectedPrice === 'Select') {
      return true;
    }
    return (
      (selectedRating === 'Select' || restaurant.rating === selectedRating) &&
      (selectedPrice === 'Select' || restaurant.price === selectedPrice)
    );
  });
fetchRestaurants([]);
  

  const renderComponent = () => {
    return (
      <>
        <SafeAreaProvider>


          <View style={styles.container}>
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdownColumn}>
                <Text style={styles.label}>Rating:</Text>
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleRatingDropdown}>
                  <Text style={styles.dropdownButtonText}>{selectedRating || 'Select'}</Text>
                  <MaterialIcons
                    name={isRatingDropdownVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
                {isRatingDropdownVisible && (
                  <View style={styles.optionList}>
                    {ratingOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.optionItem}
                        onPress={() => handleRatingSelect(option)}
                      >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.dropdownColumn}>
                <Text style={styles.label}>Price:</Text>
                <TouchableOpacity style={styles.dropdownButton} onPress={togglePriceDropdown}>
                  <Text style={styles.dropdownButtonText}>{selectedPrice || 'Select'}</Text>
                  <MaterialIcons
                    name={isPriceDropdownVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
                {isPriceDropdownVisible && (
                  <View style={styles.optionList}>
                    {priceOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.optionItem}
                        onPress={() => handlePriceSelect(option)}
                      >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.restaurantText}>Restaurants Near You</Text>
            <ScrollView style={styles.scrollableContainer}><View style={styles.restaurantContainer}>
              {filteredRestaurants.map((restaurant, index) => (
                <TouchableOpacity
                key={index}
                style={styles.restaurantCard}
                onPress={() => {
                  // Navigate to the MenuPage and pass the restaurantId as a parameter
                  navigation.navigate("MainStack", { screen: 'MenuPage' }, { restaurantId: restaurant.id });
                }}
              >
                  <Image source={restaurant.image} style={styles.restaurantImage} />
                  <Text>{restaurant.name}</Text>
                  <Text>Rating: {restaurant.rating}</Text>
                  <Text>Price: {restaurant.price}</Text>
                </TouchableOpacity>

              ))}
            </View>
            </ScrollView>
          </View>

        </SafeAreaProvider>

      </>
    );
  };
  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    backgroundColor: 'black', // Changed background color to black
  },
  headerText: {
    fontFamily: 'Oswald-Regular',
    position: 'relative',
    left: -85,
    fontSize: 20,
    textTransform: 'uppercase',
    backgroundColor: 'lightblue', // Changed background color to light blue
    color: 'black', // Changed text color to black
    padding: 10, // Added padding
    borderRadius: 8, // Added border radius
  },
  restaurantText: {
    fontFamily: 'Oswald-Regular',
    alignItems: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    backgroundColor: '#F9F6EE', // Changed background color to #F9F6EE
    color: 'black', // Changed text color to black
    padding: 10, // Added padding
    borderRadius: 8, // Added border radius
  },
  dropdownContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'gray', // Changed background color to black
    zIndex: 3,
    elevation: 6,
    marginVertical: 20, // Added margin
    borderRadius: 8, // Added border radius
  },
  dropdownColumn: {
    flex: 1,
    paddingHorizontal: 10,
    zIndex: 2,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    backgroundColor: '#F9F6EE', // Changed background color to #F9F6EE
    color: 'black', // Changed text color to black
    padding: 5, // Added padding
    borderRadius: 8, // Added border radius
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'lightblue', // Changed background color to light blue
  },
  dropdownButtonText: {
    marginRight: 10,
    backgroundColor: 'black', // Changed background color to black
    color: 'white', // Changed text color to white
    padding: 5, // Added padding
    borderRadius: 4, // Added border radius
  },
  optionList: {
    position: 'absolute',
    top: 65,
    right: 12,
    backgroundColor: '#F9F6EE', // Changed background color to #F9F6EE
    borderRadius: 4,
    elevation: 5,
    zIndex: 2,
    width: 160,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  restaurantContainer: {
    flex: 1,
    width: screenWidth - 50,
    backgroundColor: 'black', // Changed background color to black
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center', // Centered the items horizontally
  },
  restaurantCard: {
    backgroundColor: 'lightblue', // Changed background color to light blue
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: '44%',
    elevation: 4, // Added elevation for a shadow effect
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantName: {
    color: 'black', // Changed text color to black
  },
  restaurantRating: {
    color: 'black', // Changed text color to black
  },
  restaurauntPrice: {
    color: 'black', // Changed text color to black
  },
});


export default RestaurantsPage;