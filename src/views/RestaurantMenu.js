import { useState, useEffect } from "react";
import React from "react";
import { View, Text, Button, FlatList,Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const MenuPage = ({ route }) => {
  const  restaurantId  = 1;
    const [restaurantData, setRestaurantData] = useState({});
  const [order, setOrder] = useState({});
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false); // Add isOrderModalVisible state

  // Fetch restaurant data and menu items from the API
  useEffect(() => {
    setOrder({});
    setIsOrderModalVisible(false);

    fetch(`https://localhost:3000/restaurants/index?id=${restaurantId}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurantData(data);
        // Initialize the order with zero quantity for each menu item
        const initialOrder = {};
        data.products.forEach((product) => {
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
      restaurantData.products.forEach((product) => {
        initialOrder[product.id] = 0;
      });
      setOrder(initialOrder);
    };
  }
  // This is where you would typically make a POST request to the API
  const handleConfirmOrder = () => {
    // Send the order data to the server for processing
    // This is where you would typically make a POST request to the API
    console.log('Order:', order);

    // Reset the order
    const initialOrder = {};
    restaurantData.products.forEach((product) => {
      initialOrder[product.id] = 0;
    });
    setOrder(initialOrder);

    // Close the order confirmation modal
    setIsOrderModalVisible(false);
  };



  const isCreateOrderButtonDisabled = Object.values(order).every((quantity) => quantity === 0);


  return (
    <View>
      <Text>{restaurantData.name}</Text>
      <FlatList
        data={restaurantData.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Button title="+" onPress={() => handleIncrement(item.id)} />
            <Text>{order[item.id]}</Text>
            <Button title="-" onPress={() => handleDecrement(item.id)} />
          </View>
        )}
      />
      <Button title="Checkout" onPress={handleCheckout} />
      <Button
        title="Create Order"
        onPress={handleCheckout}
        disabled={isCreateOrderButtonDisabled}
      />
      <Modal
        visible={isOrderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOrderModalVisible(false)}
      >
        <View>
          <Text>Order Confirmation</Text>
          {/* Display order summary here */}
          <Button title="Confirm" onPress={handleConfirmOrder} />
          <Button
            title="Cancel"
            onPress={() => setIsOrderModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MenuPage;

