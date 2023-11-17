import { useState, useEffect } from "react";
import React from "react";
import { View, Text, Button, FlatList, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const MenuPage = ({ }) => {




  const route = useRoute(); // Get the route object to access parameters
  const { restaurantId, customerId } = route.params;



  const [restaurantData, setRestaurantData] = useState({});
  const [order, setOrder] = useState({});
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false); // Add isOrderModalVisible state

  // Fetch restaurant data and menu items from the API
  useEffect(() => {
    setOrder({});
    setIsOrderModalVisible(false);
    console.log(restaurantId)
    fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${(restaurantId)}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurantData(data);
        console.log(data)
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

  const handleCheckout = () => {
    // Send the order data to the server for processing
    // Check if any item has a quantity greater than 0
    const hasItemsInOrder = Object.values(order).some((quantity) => quantity > 0);

    if (hasItemsInOrder) {
      // Display the order confirmation modal
      setIsOrderModalVisible(true);
      console.log('Order:', order);
      // Reset the order
      const initialOrder = {};
      restaurantData.forEach((product) => {
        initialOrder[product.id] = 0;
      });
      setOrder(initialOrder);
    };
  }
  
  // This is where you would typically make a POST request to the API
  const handleConfirmOrder = async () => {
    // Send the order data to the server for processing
    // This is where you would typically make a POST request to the API
    console.log('Order:', order);
    
      const orderData = {
        restaurant_id: restaurantId,
        customer_id: customerId,
        products: Object.keys(order).map((productId) => ({
          id: productId,
          quantity: order[productId].toString(),
        })),
      };

      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
      if(response.ok){
    // Reset the order
    const initialOrder = {};
    restaurantData.forEach((product) => {
      initialOrder[product.id] = 0;
    });
    setOrder(initialOrder);

    // Close the order confirmation modal
    setIsOrderModalVisible(false);
  }else{
    setOrder(order)
    setIsOrderModalVisible(false);
return
  }
  };



  const isCreateOrderButtonDisabled = Object.values(order).every((quantity) => quantity === 0);


  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.restaurantName}>Restaurant Name:{restaurantData.name} Restaurant ID{restaurantId} Customer ID: {customerId}</Text>
        <FlatList
          data={restaurantData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Button title="+" onPress={() => handleIncrement(item.id)} />
              <Text>{order[item.id]}</Text>
              <Button title="-" onPress={() => handleDecrement(item.id)} />
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Checkout" onPress={handleCheckout} style={styles.button} />
        <Button
          title="Create Order"
          onPress={handleCheckout}
          disabled={isCreateOrderButtonDisabled}
          style={styles.button}
        />
      </View>

      <Modal
        visible={isOrderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOrderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Order Confirmation</Text>
          {/* Display order summary here */}
          <Button title="Confirm" onPress={handleConfirmOrder} style={styles.button} />
          <Button title="Cancel" onPress={() => setIsOrderModalVisible(false)} style={styles.button} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: '40%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default MenuPage;

