import * as React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions, Modal, Image, Button, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

import { DataTable } from 'react-native-paper';




const DeliveryHistory = () => {
  const [deliverysData, setDeliverysData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { customerId } = useContext(CustContext)
  const { courierID } = useContext(CourierContext)

  const [showContent, setShowContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [newStatus, setNewStatus] = useState('')

  const navigation = useNavigation(); // Get the navigation object
  const { userRole } = useContext(RoleContext)

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 7, 11]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const selectedProducts = [selectedDelivery.products];



  const fetchDeliverys = async () => {
    try {
      setLoading(true);
      setError('');
      console.log("userRole", userRole)


      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?type=${userRole}&id=${courierID}`);
      if (response.ok) {
        const data = await response.json();
        setDeliverysData(data);
        setSuccess(true);
        setLoading(false)

        setTimeout(() => {
          setSuccess(false);
          setShowContent(true);
        }, 3000);
      } else {
        setError('Error fetching data', response.status, response.statusText);
        return;
      }



    } catch (error) {
      setError('Error fetching data', error);
    } finally {
      setLoading(false);
      return;
    }
  };

  //DATA TABLE ASSETS

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, deliverysData.length);

  //END DATA TABLE ASSETS



  useEffect(() => {
    // Fetch deliverys when the component mounts
    fetchDeliverys();
  }, []);

  const handleDeliveryPress = async (delivery) => {
    setModalVisible(true);
    setSelectedDelivery(delivery);
  };
  const handleStatusPressPending = async (delivery) => {

    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/order/${delivery.id}/in progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

    });
    if (response.ok) {
      const data = await response.json()

      // Assuming deliverysData is a state variable
      // Update deliverysData in a way that triggers a re-render
      setDeliverysData((prevData) => {
        // Modify the specific delivery object in the array with the updated status
        const updatedData = prevData.map((item) =>
          item.id === delivery.id ? { ...item, status: data.status } : item
        );

        return updatedData;
      });
    } else {
      // Handle error if needed
      console.error('API call failed');
    }

  }
  const handleStatusPressProgress = async (delivery) => {
    console.log(delivery.status)

    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/order/${delivery.id}/delivered`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

    });
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      // Assuming deliverysData is a state variable
      // Update deliverysData in a way that triggers a re-render
      setDeliverysData((prevData) => {
        // Modify the specific delivery object in the array with the updated status
        const updatedData = prevData.map((item) =>
          item.id === delivery.id ? { ...item, status: data.status } : item
        );

        return updatedData;
      });
    } else {
      // Handle error if needed
      console.error('API call failed');
    }

  }

  const renderStatus = (delivery) => {
    if (showContent) {
      if (delivery.status == 'pending') {
        return (

          <Pressable style={styles.statusPendingButton}
            onPress={() => {
              handleStatusPressPending(delivery)
            }}
          >
            <Text style={styles.statusText}> {delivery.status}</Text>
          </Pressable>
        );
      }

      if (delivery.status == 'in progress') {

        return (


          <Pressable style={styles.statusInProgressButton}
            onPress={() => {
              handleStatusPressProgress(delivery)
            }
            }
          >
            <Text style={styles.statusText}> {delivery.status}</Text>
          </Pressable>
        );
      }

      if (delivery.status == 'delivered') {

        return (

          <Pressable style={styles.statusDeliveredButton}
          >
            <Text style={styles.statusText}> {delivery.status}</Text>

          </Pressable>
        );

      }
    }
  }
  const renderContent = () => {
    if (!showContent) {
      if (loading) {
        return (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Processing Delivery...</Text>
            </View>
        );
      }

      if (success) {
        return (

          <View style={styles.successContainer}>
            <FontAwesome name="check" size={50} color="green" />
            <Text style={styles.successText}>Delivery Successfully Processed</Text>

          </View>
        );
      }

      if (error) {
        console.log(error)
        return (

          <View style={styles.errorContainer}>
            <FontAwesome name="times" size={50} color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        );
      }
    }

    return (
      <DataTable style={styles.scrollableContainer}>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title style={styles.tableAddress}>Address</DataTable.Title>

          <DataTable.Title style={{ left: '11%' }} >Status</DataTable.Title>
          <DataTable.Title style={{ left: '15%' }}>Details</DataTable.Title>

        </DataTable.Header>

        {deliverysData.slice(from, to).map((delivery, index) => (
          <DataTable.Row key={delivery.id.toString()}>
            <DataTable.Cell>{delivery.id}</DataTable.Cell>
            <DataTable.Cell style={styles.tableAddress} >
              <Text>
                            {delivery.customer_address.substring(0, delivery.customer_address.indexOf(','))}

              </Text>

            </DataTable.Cell>

            <DataTable.Cell numeric style={{ left: '5%' }}>
              {renderStatus(delivery)}

            </DataTable.Cell>
            <DataTable.Cell numeric><TouchableOpacity
              key={index}
              onPress={() => handleDeliveryPress(delivery)}

            ><Ionicons
                name='search'
                size={25}
                color='#007bff' />
            </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(deliverysData.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${deliverysData.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.deliveryText}>Your Previous Deliveries</Text>
        {renderContent()}

        {/* MODAL FOR DISPLAYNG DETAILS */}
        <Modal style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}

        >
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>{selectedDelivery.restaurant_name}</Text>
            <Text style={styles.courierName}>Courier: {selectedDelivery.courier_name}</Text>

            {/* Map through the products and create a card for each product */}
            {selectedDelivery.products && selectedDelivery.products.map((product, index) => (
              <View key={index} style={styles.orderSummaryItem}>
                <Text style={styles.modalTextName}>{product.product_name}</Text>
                <Text style={styles.modalText}>x {product.quantity}</Text>
                <Text style={styles.modalText}>$ {product.unit_cost}</Text>
                {/* You can add more details if needed */}
              </View>
            ))}
            <View style={styles.theLine}></View>
            <Text style={styles.modalTotalText}>Total Price: ${selectedDelivery.total_cost}</Text>


            {/* Add more details as needed */}
            <Pressable style={styles.modalCancelButton}
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
  courierName: {
    fontWeight: 'bold',
    marginBottom:12
  }, 
   orderSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
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

  }, 
  modalTextName: {
    marginHorizontal: 10, // Adjust the horizontal margin between items
    flex: 2, // Each TouchableOpacity takes equal width
    fontWeight: 'bold'
  },
  modalTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    left:'15%'
  }, 
  cancelText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.50,
    color: 'white',
    justifyContent: 'center', // Vertically center the text

  },
  statusPendingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#851919',
    borderColor: '#222126',
    height: 40,
    width: 100,

  }, statusInProgressButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#DA583B',
    borderColor: '#222126',
    height: 40,
    width: 100,

  }, statusDeliveredButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#609475',
    borderColor: '#222126',
    height: 40,
    width: 100,

  }, statusText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  deliveryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restoName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
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
    width: '80%',
    textAlign: 'center'
  },
  itemName: { fontWeight: 'bold' },
  modalContainer: {
    backgroundColor: 'white',
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
  deliveryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  deliveryCard: {
    backgroundColor: 'lightblue', // Changed background color to light blue
    bdeliveryRadius: 8,
    margin: 10,
    padding: 10,
    width: '80%',
    elevation: 4,
  },
  deliveryImage: {
    // Define your image styles here
  }, itemContainer: {
    marginVertical: 10,
  },
  deliveryModal: {
    width: "80%",
    height: "80%"
  }, tableAddress: {
    right:'8%',
  },
  modalView: {
    left: '10%',
    top: '20%',
    zIndex: 1,
    position: 'relative',
    height:'auto',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: "#DA583B",
    borderWidth: 4,
    padding: 6,
    textAlign: 'center',
    alignItems: 'center',


  }, modal: {

    zIndex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },theLine:{
    height:2,
    borderWidth:1,
    borderColor:'black',
    margin:12,
    width:'90%'
  }
});


export default DeliveryHistory;





