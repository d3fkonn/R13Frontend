import { useState, useEffect, useContext } from "react";
import React from "react";
import { View, Text, Button, FlatList, Modal, StyleSheet, Dimensions, ScrollView, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import CustContext from "../component/CustContext";

const MenuPage = ({ }) => {



const navigation = useNavigation();
  const route = useRoute(); // Get the route object to access parameters
  const { restaurantId } = route.params;
  const { customerId } = useContext(CustContext)

  const [showContent, setShowContent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [sendSMS, setSendSMS] = useState(false)
  const [sendEmail, setSendEmail] = useState(false)
  const [showEmailCheckmark, setShowEmailCheckmark] = useState(false);
  const [showSMSCheckmark, setShowSMSCheckmark] = useState(false);

  const [restaurantData, setRestaurantData] = useState({});
  const [order, setOrder] = useState({});
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false); // Add isOrderModalVisible state

  // Fetch restaurant data and menu items from the API
  useEffect(() => {
    setOrder({});
    setIsOrderModalVisible(false);
    console.log("restaurantID", restaurantId)
    fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${(restaurantId)}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurantData(data);
        console.log("data", data)
        // Initialize the order with zero quantity for each menu item
        const initialOrder = {};
        data.forEach((product) => {
          initialOrder[product.id] = 0;
        });
        setOrder(initialOrder);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [restaurantId]);

  const handleIncrement = (productId) => {
    setOrder({ ...order, [productId]: order[productId] + 1 });
  };

  const handleDecrement = (productId) => {
    if (order[productId] > 0) {
      setOrder({ ...order, [productId]: order[productId] - 1 });
    }
  };

  const toggleSMSCheckmark = () => {
    setSendSMS(!sendSMS)
    console.log(sendEmail)

  };

  const toggleEmailCheckmark = () => {
    setSendEmail(!sendEmail)
    console.log(sendEmail)
  };
const handleBack = () =>{
  navigation.navigate('RestaurantsPage', {

  });
}
  const handleCheckout = () => {
    // Send the order data to the server for processing
    // Check if any item has a quantity greater than 0
    const hasItemsInOrder = Object.values(order).some((quantity) => quantity > 0);

    if (hasItemsInOrder) {
      // Display the order confirmation modal
      setIsOrderModalVisible(true);
      console.log('CustomerId:', customerId);
      // Reset the order
      // const initialOrder = {};
      // restaurantData.forEach((product) => {
      //   initialOrder[product.id] = 0;
      // });
      // setOrder(initialOrder);
    };
  }

  // This is where you would typically make a POST request to the API
  const handleConfirmOrder = async () => {
    // Send the order data to the server for processing
    // This is where you would typically make a POST request to the API
    setLoading(true)
    const orderData = {
      restaurant_id: restaurantId,
      customer_id: customerId,
      products: Object.keys(order).map((productId) => ({
        id: productId,
        quantity: order[productId].toString(),
      })),
    };
    console.log('OrderData:', orderData);

    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders/${sendSMS}/${sendEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    if (response.ok) {
      setLoading(false)
      setSuccess(true)
      // Reset the order  
      const initialOrder = {};
      restaurantData.forEach((product) => {
        initialOrder[product.id] = 0;
      });
      setOrder(initialOrder);
      setTimeout(() => {
        setSuccess(false);
        setShowContent(true);
      }, 5000);

      // Close the order confirmation modal
      setIsOrderModalVisible(false);
    } else {
      setError('Error creating Entry')
      setLoading(false)

      setTimeout(() => {
        setError('')
        setOrder(order)
        setIsOrderModalVisible(false);
      }, 5000);

      return
    }
  };



  const restaurantImages = {
    Greek: require('../../assets/fonts/images/restaurants/cuisineGreek.jpg'),
    Japanese: require('../../assets/fonts/images/restaurants/cuisineJapanese.jpg'),
    Pasta: require('../../assets/fonts/images/restaurants/cuisinePasta.jpg'),
    Pizza: require('../../assets/fonts/images/restaurants/cuisinePizza.jpg'),
    Southeast: require('../../assets/fonts/images/restaurants/cuisineSoutheast.jpg'),
    Viet: require('../../assets/fonts/images/restaurants/cuisineViet.jpg'),
  };

  // ... (rest of your code)

  const getRandomImage = () => {
    const imageKeys = Object.keys(restaurantImages);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return restaurantImages[randomKey];
  };


  const renderContent = () => {
    if (!showContent) {
      if (!loading && !success && error == '') {
        return (
          <View>

            <View style={styles.notifContainer}>
              <Text>Send SMS?</Text>
              {sendSMS ? (
                <>

                  <Pressable style={styles.square} onPress={toggleSMSCheckmark}>
                    <Text style={styles.checkmark}>✔</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable style={styles.square} onPress={toggleSMSCheckmark}></Pressable>
                </>
              )}

              <Text>Send Email?</Text>
              {sendEmail ? (
                <>

                  <Pressable style={styles.square} onPress={toggleEmailCheckmark}>
                    <Text style={styles.checkmark}>✔</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable style={styles.square} onPress={toggleEmailCheckmark}></Pressable>
                </>
              )}

            </View>
            <Pressable title="Confirm" onPress={handleConfirmOrder} style={styles.modalSubmitButton} ><Text>Submit</Text></Pressable>
            <Pressable title="Cancel" onPress={() => setIsOrderModalVisible(false)} style={styles.modalCancelButton}><Text>Cancel</Text></Pressable>

          </View>)
      }
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Processing Order...</Text>
          </View>
        );
      }

      if (success) {
        return (

          <View style={styles.successContainer}>
            <FontAwesome name="check" size={25} color="green" />
            <Text style={styles.successText}>Order Successfully Processed</Text>
          </View>
        );
      }

      if (error) {
        console.log(error)
        return (

          <View style={styles.errorContainer}>
            <FontAwesome name="times" size={25} color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        );
      }
    }
  }

  const isCreateOrderButtonDisabled = Object.values(order).every((quantity) => quantity === 0);


  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.scrollContainer}>
        <Text style={styles.restaurantName}> Restaurant ID{restaurantId}</Text>
        <FlatList
          data={restaurantData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (

            <View style={styles.itemContainer}>
              <Image source={getRandomImage()} style={styles.restaurantImage} />

              <View style={styles.nameCostContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCost}>${item.cost}</Text>
              </View>
              <View style={styles.incrementContainer}>
                <Pressable style={styles.incrementButton} onPress={() => handleIncrement(item.id)} >
                  <Text style={{ color: 'white', fontWeight: '900', fontSize: 20, textAlign: 'center' }}>+</Text>
                </Pressable>
                <Text style={styles.itemQuant}>{order[item.id]}</Text>
                <Pressable style={styles.incrementButton} onPress={() => handleDecrement(item.id)} >
                  <Text style={{ color: 'white', fontWeight: '900', fontSize: 20, textAlign: 'center' }} >-</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </SafeAreaProvider>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={handleBack} style={styles.button} />
        <Button
          title="Create Order"
          onPress={handleCheckout}
          disabled={isCreateOrderButtonDisabled}
          style={styles.button}
        />
      </View>
      {/* ORDER CONFIRMATION MODAL */}
      <Modal
        visible={isOrderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOrderModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
            Order Confirmation
            </Text>
          </View>
          <View style={styles.theLine}/>
          {/* Display order summary here */}
          {Object.keys(order).map((productId) => {
            const quantity = order[productId];
            const product = restaurantData.find((item) => item.id === parseInt(productId));
            const subtotal = quantity * parseFloat(product.cost);
            return (
              <View key={productId} style={styles.orderSummaryItem}>
                <Text style={styles.modalTextName} >{product.name}</Text>
                <Text style={styles.modalText}>x {quantity}</Text>
                <Text style={styles.modalText}> $ {product.cost}</Text>
              </View>
            );
          })}
          <View style={styles.theLine}/>
          <Text style={styles.modalTotalText}>Total: ${Object.keys(order).reduce((total, productId) => {
            const quantity = order[productId];
            const product = restaurantData.find((item) => item.id === parseInt(productId));
            return total + quantity * parseFloat(product.cost);
          }, 0).toFixed(2)}</Text>
          {renderContent()}
        </View>
      </Modal>

    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
  },
  successContainer: {
    alignItems: 'center',

  },
  successText: {
    fontSize: 20,
    color: 'green',
  },
  errorContainer: {
    alignItems: 'center',


  },
  errorText: {
    fontSize: 20,
    color: 'red',

  },

  modalCancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#DA583B',
    borderColor: '#222126',
    margin: 10,
    height: 50,
    width: 'auto'
  },
  modalSubmitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#609475',
    borderColor: '#222126',
    margin: 10,
    height: 50,
    width: 'auto'
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginBottom: 100, // Adjust this value as needed
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 120,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: '5%'
  },
  itemQuant: {
    marginHorizontal: 10,
    fontSize: 16,
    margin: 12
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  orderSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  button: {
    width: '40%',
  },
  modalHeader: {
   
  },modalHeaderText:{
    fontSize: 20,
    fontWeight: '900',
    color:'black',
    textAlign:'center'
  },
  modalText: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 1, // Each TouchableOpacity takes equal width

  }, modalTextName: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 2, // Each TouchableOpacity takes equal width
fontWeight:'bold'
  },
  modalTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modal: {

  },
  incrementContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '20%',
    flex: 1,
    justifyContent: 'center'
  },
  itemName: { fontWeight: '900', fontSize: 18, marginLeft: 10, },
  itemCost: { fontWeight: 'bold', fontSize: 15, marginLeft: 10, marginVertical: 12 },
  incrementButton: { height: 30, width: 30, borderRadius: '50%', color: 'black', borderColor: 'black', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height:'auto',
    left: '10%',
    top: '20%',
    borderRadius: 12,
    borderColor: "#DA583B",
    borderWidth: 6,
    

  }, restaurantImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  square: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  checkmark: {
    color: 'black',
    fontSize: 24,
  },
  notifContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, nameCostContainer: {
    flexDirection: 'column',
    flex: 2
  },theLine:{
    height:2,
    borderWidth:1,
    borderColor:'black',
    margin:12,
    width:'90%'
  }


});

// 
export default MenuPage;

