import * as React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions, Modal, Image, Button, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/core';
import CustContext from '../component/CustContext';
import CourierContext from '../component/CourierContext';
import { useContext } from 'react';
import RoleContext from '../component/RoleContext';
import { useNavigation } from '@react-navigation/native'; // Correct import statement





const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { customerId } = useContext(CustContext)
  const { courierID } = useContext(CourierContext)

  const [showContent, setShowContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const [selectedRating, setSelectedRating] = useState('Select');
  const [selectedPrice, setSelectedPrice] = useState('Select');
  const [historyID, setHistoryID] = useState()
  const navigation = useNavigation(); // Get the navigation object

  const { userRole } = useContext(RoleContext)


  const selectedProducts = [selectedOrder.products];


  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      console.log("userRole", userRole)

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
        console.log(error)
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
              <Text>Customer: {order.customer_name}</Text>

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
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}

        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeaderText}>{selectedOrder.restaurant_name}</Text>
            <View style={styles.theLine}/>
            <Text style={styles.courierName}>Courier: {selectedOrder.courier_name}</Text>

            {/* Map through the products and create a card for each product */}
            {selectedOrder.products && selectedOrder.products.map((product, index) => (
              <View key={index} style={styles.orderSummaryItem}>
                <Text style={styles.modalTextName}>{product.product_name}</Text>
                  <Text style={styles.modalText}>x {product.quantity}</Text>
                  <Text style={styles.modalText}>$ {product.unit_cost}</Text>
                {/* You can add more details if needed */}
              </View>
            ))}
            <View style={styles.theLine} />
            <Text style={styles.modalTotalText}>Total Price: ${selectedOrder.total_cost}</Text>


            {/* Add more details as needed */}
            <Pressable
              style={styles.modalCancelButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.cancelText}>Close Modal</Text>
            </Pressable>
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

  },cancelText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.50,
    color: 'white',
    justifyContent: 'center', // Vertically center the text

  },
  orderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#DA583B',
    borderColor: 'black',
    marginTop: 10,
    height: 50,
    width: 'auto',
  },
  itemName: { fontWeight: 'bold', marginVertical: 12 },
  totalCost: { fontWeight: 'bold', left: '60%' },
  
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
  }, modalView: {
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


  }, userInfo: {

    position: 'relative',
    height: 80,
    width: '80%',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    borderRadius: 1,
    borderColor: "#DA583B",
    borderWidth: 4,
    padding: 6,
    textAlign: 'center',

  }, modal: {
    zIndex: 1,
    position: 'relative',
    backgroundColor: 'white',

  }, modalText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
  }, rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, theLine: {
    height: 2,
    borderWidth: 1,
    borderColor: 'black',
    margin: 12,
    width:'90%'
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center'
  },
  modalText: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 1, // Each TouchableOpacity takes equal width

  }, modalTextName: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 2, // Each TouchableOpacity takes equal width
    fontWeight: 'bold'
  },
  modalTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    left:'15%'
  },  modalContainer: {
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
    

  }, courierName: {
    fontWeight: 'bold',
    marginBottom:12
  },
  orderSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

});


export default OrderHistory;


