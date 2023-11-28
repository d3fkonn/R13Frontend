import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
const [userRole, setUserRole] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?type=${userRole}`);
      if (response.ok) {
        const data = await response.json();
        setOrdersData(data);
        setSuccess(true);
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };
    const filteredOrders = ordersData.filter((order) => {
      if (selectedRating === 'Select' && selectedPrice === 'Select') {
        return true;
      }
      return (
        (selectedRating === 'Select' || order.rating === selectedRating) &&
        (selectedPrice === 'Select' || order.price === selectedPrice)
      );
    });

    useEffect(() => {
      // Fetch orders when the component mounts
      fetchOrders();
    }, []);
    

  const renderContent = () => {
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
          <FontAwesome name="check" size={50} color="green" />
          <Text style={styles.successText}>Order Successfully Processed</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <FontAwesome name="times" size={50} color="red" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.orderContainer}>
          {filteredOrders.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={styles.orderCard}
              onPress={() => {
                // Navigate to the MenuPage and pass the orderId as a parameter
                navigation.navigate('MenuPage', { orderId: order.id });
              }}
            >
              <Image source={order.image} style={styles.orderImage} />
              <Text>{order.name}</Text>
              <Text>Rating: {order.rating}</Text>
              <Text>Price: {order.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.orderText}>Orders Near You</Text>
        {renderContent()}
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
    // Define your order card styles here
  },
  orderImage: {
    // Define your image styles here
  },
});


export default OrderHistory;