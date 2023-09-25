import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuPage from './RestaurantMenu';
// import restaurants from './data'
import Header from '../nav/Header';
import Footer from '../nav/Footer';

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
  // const [restaurantData, setRestaurantData] = useState([]);


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

  const restaurantData = [
    {
        "id": 1,
        "user_id": 3,
        "address_id": 16,
        "phone": "254.757.1715 x5879",
        "email": "lorrie_von@gottlieb-hyatt.example",
        "name": "Fat Brasserie",
        "price_range": 2,
        "active": true,
        "created_at": "2023-09-22T15:47:21.451Z",
        "updated_at": "2023-09-22T15:47:21.451Z",
        "rating": 5
    },
    {
        "id": 2,
        "user_id": 13,
        "address_id": 4,
        "phone": "(838) 676-1066 x1217",
        "email": "jamar@rice.example",
        "name": "Orange Cafe",
        "price_range": 1,
        "active": true,
        "created_at": "2023-09-22T15:47:21.463Z",
        "updated_at": "2023-09-22T15:47:21.463Z",
        "rating": 5
    },
    {
        "id": 3,
        "user_id": 2,
        "address_id": 12,
        "phone": "930-377-6511 x025",
        "email": "lera_beahan@mueller.test",
        "name": "DE Bakery",
        "price_range": 3,
        "active": true,
        "created_at": "2023-09-22T15:47:21.474Z",
        "updated_at": "2023-09-22T15:47:21.474Z",
        "rating": 5
    },
    {
        "id": 4,
        "user_id": 20,
        "address_id": 2,
        "phone": "184.718.7272 x523",
        "email": "alphonse.beahan@beahan-kub.example",
        "name": "Sweet Juice Bar",
        "price_range": 3,
        "active": true,
        "created_at": "2023-09-22T15:47:21.489Z",
        "updated_at": "2023-09-22T15:47:21.489Z",
        "rating": 4
    },
    {
        "id": 5,
        "user_id": 18,
        "address_id": 11,
        "phone": "1-865-946-3932 x14895",
        "email": "danelle@lang.example",
        "name": "869 Spoon",
        "price_range": 1,
        "active": true,
        "created_at": "2023-09-22T15:47:21.503Z",
        "updated_at": "2023-09-22T15:47:21.503Z",
        "rating": 1
    },
    {
        "id": 6,
        "user_id": 2,
        "address_id": 8,
        "phone": "(214) 912-8198 x46996",
        "email": "alton@simonis-schumm.test",
        "name": "Blue Plate Pizza",
        "price_range": 1,
        "active": true,
        "created_at": "2023-09-22T15:47:21.515Z",
        "updated_at": "2023-09-22T15:47:21.515Z",
        "rating": 4
    },
    {
        "id": 7,
        "user_id": 15,
        "address_id": 18,
        "phone": "389.105.0004 x65868",
        "email": "iris_mraz@kessler.example",
        "name": "Thirsty Eats",
        "price_range": 2,
        "active": true,
        "created_at": "2023-09-22T15:47:21.527Z",
        "updated_at": "2023-09-22T15:47:21.527Z",
        "rating": 4
    },
    {
        "id": 8,
        "user_id": 2,
        "address_id": 7,
        "phone": "(537) 225-8330",
        "email": "boyd_reichel@bergnaum.test",
        "name": "Big Pub",
        "price_range": 1,
        "active": true,
        "created_at": "2023-09-22T15:47:21.540Z",
        "updated_at": "2023-09-22T15:47:21.540Z",
        "rating": 1
    }
]


//   const fetchRestaurants = async () => {
//   try {
//     const response = await fetch('https://localhost:3000/restaurants/show');
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       setRestaurantData(data);
//     } else {
//       console.error('Error fetching data:', response.status);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };
  const filteredRestaurants = restaurantData.filter((restaurant) => {
    if (selectedRating === 'Select' && selectedPrice === 'Select') {
      return true;
    }
    return (
      (selectedRating === 'Select' || restaurant.rating === selectedRating) &&
      (selectedPrice === 'Select' || restaurant.price === selectedPrice)
    );
  });
// fetchRestaurants([]);
  

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
                    navigation.navigate('MenuPage', { restaurantId: restaurant.id });
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
