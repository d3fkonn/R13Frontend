import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions, Modal, Image, Button, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/core';
import CustContext from '../component/CustContext';
import { useContext } from 'react';

import { useNavigation } from '@react-navigation/native'; // Correct import statement





const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { customerId } = useContext(CustContext)
  const [showContent, setShowContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const [selectedRating, setSelectedRating] = useState('Select');
  const [selectedPrice, setSelectedPrice] = useState('Select');

  const navigation = useNavigation(); // Get the navigation object

  const route = useRoute();
  const { userRole } = route.params


const selectedProducts = [selectedOrder.products];
console.log("products",selectedProducts)


  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      console.log("userRole", userRole)
      console.log("OrderHistID", customerId)
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?type=${userRole}&id=${customerId}`);
      if (response.ok) {
        const data = await response.json();
        setOrdersData(data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setShowContent(true);
        }, 5000);
      } else {
        setError('Error fetching data');
        return;
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
      return;
    }
  };





  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, []);

  const handleOrderPress = async (order) => {
    setModalVisible(true);
    setSelectedOrder(order);
  };



  const renderContent = () => {
    if (!showContent) {
      if (loading) {
        return (<Modal>

          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Processing Order...</Text>
          </View></Modal>
        );
      }

      if (success) {
        return (

          <View style={styles.successContainer}>
            <FontAwesome name="check" size={50} color="green" />
            <Text style={styles.successText}>Order Successfully Processed</Text>
          </View>
        );
      }

      if (error) {
        return (<Modal>

          <View style={styles.errorContainer}>
            <FontAwesome name="times" size={50} color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View></Modal>
        );
      }
    }

    return (
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.orderContainer}>
          {ordersData.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={styles.orderCard}
              onPress={() => handleOrderPress(order)}

            >
              <Image source={order.image} style={styles.orderImage} />
              <Text style={styles.restoName}>{order.restaurant_name}</Text>
              <Text>Courier: {order.courier_name}</Text>
              <Text>Price: {order.total_cost}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.orderText}>Your Previous Orders</Text>
        {renderContent()}

        {/* MODAL FOR DISPLAYNG DETAILS */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.restoName}>{selectedOrder.restaurant_name}</Text>
            <Text>Courier: {selectedOrder.courier_name}</Text>
            <Text>Price: {selectedOrder.total_cost}</Text>
  
            {/* Map through the products and create a card for each product */}
            {selectedOrder.products && selectedOrder.products.map((product, index) => (
  <View key={index} style={styles.productCard}>
    <Text>{product.product_name}</Text>
    <Text>Quantity: {product.quantity}</Text>
    <Text>Unit Cost: {product.unit_cost}</Text>
    {/* You can add more details if needed */}
  </View>
))}
           

            {/* Add more details as needed */}
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  }, restoName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  }, modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  scrollableContainer: {
    flex: 1,
  },
  orderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  orderCard: {
    backgroundColor: 'lightblue', // Changed background color to light blue
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: '80%',
    elevation: 4,
  },
  orderImage: {
    // Define your image styles here
  }, itemContainer: {
    marginVertical: 10,
  },
  orderModal: {
    width: "80%",
    height: "80%"
  }
});


export default OrderHistory;


