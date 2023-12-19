import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Modal, Text, StyleSheet, Dimensions } from 'react-native';
import UserContext, { useUser } from '../component/UserContext';
import { useNavigation } from '@react-navigation/native';
import useRoute from '@react-navigation/native';
import CustContext from '../component/CustContext';
import CourierContext from '../component/CourierContext';
import { useSSRSafeId } from '@react-aria/ssr';
import { Picker } from '@react-native-picker/picker';
import RoleContext from '../component/RoleContext';
import AuthContext from '../component/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message/lib';





const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get('screen').width;


const UserSelectionPage = () => {
  const { userId } = useContext(UserContext)
  const navigation = useNavigation();
  const { setAuthenticated } = useContext(AuthContext)
  const { setUserRole } = useContext(RoleContext)
  const { courierID } = useContext(CourierContext)
  const { customerId } = useContext(CustContext)
  const { setCourierID } = useContext(CourierContext)
  const { setCustomerId } = useContext(CustContext)
  const [userData, setUserData] = useState({})
  const [addressData, setAddressData] = useState([])
  const [formAddressID, setFormAddressID] = useState()
  const [addressName, setAddressName] = useState("")
  const { userRole } = useContext(RoleContext)
  const [roleData, setRoleData] = useState({})
  const [loading, setLoading] = useState(false);


  // State for modals
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [courierModalVisible, setCourierModalVisible] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    user_id: userId,
    address_id: formAddressID,
    phone: '',
    email: '',
    active: true,
  });



  const roleCheck = async () => {
    setLoading(true)
    if (userRole == 'courier') {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/couriers/${courierID}`);
      console.log(userId)
      if (response.ok) {
        const data = await response.json();
        setRoleData(data)
        console.log("courierData", data)
        setLoading(false)

        return;
      } else {
        console.log(" courierData error", response.status, response.statusText);
        return ("error", response);
      }
    }
    if (userRole == 'customer') {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/customers/${customerId}`);
      console.log(userId)
      if (response.ok) {
        const data = await response.json();
        setRoleData(data)
        console.log("customerData", data)
        setLoading(false)

        return;
      } else {
        console.log(" customerData error", response.status, response.statusText);
        return ("error", response);

      }
    }
  }

  // ... existing code ...

  const findUser = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/users/${userId}`);
    console.log(userId)
    if (response.ok) {
      const data = await response.json();
      setUserData(data)
      console.log("findUser", data)
      return;
    } else {
      return ("error", response);

    }

  }
  const findAddress = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/addresses/index`);
    if (response.ok) {
      const data = await response.json();
      setAddressData(data)
      return;
    } else {
      return ("error", response);
    }

  }
  

  useEffect(() => {
    roleCheck();
    findUser();
    findAddress();
  }, [userRole])


  // Function to handle creating a customer
  const createCustomer = async () => {
    setLoading(true)

    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/customers/${customerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setLoading(false)
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Customer account updated successfully',
        visibilityTime: 4000, // Duration in milliseconds
        autoHide: true,
        topOffset: 50, // Adjust the top offset as needed
        customTextStyle: {
          fontSize: 30, // Set the font size for text1 and text2
        },
        customHeight:300,
  
      });
  
         }else{
          Toast.show({
            type:'error',
            position: 'top',
            text1: 'Error',
            text2: 'Account update failed, please try again later, or restart the app',
            visibilityTime: 4000, // Duration in milliseconds
            autoHide: true,
            topOffset: 50, // Adjust the top offset as needed
            customTextStyle: {
              fontSize: 30, // Set the font size for text1 and text2
            },
            customHeight:300,
      
          });
         }
  };

  // Function to handle creating a courier
  const createCourier = async () => {
    setLoading(true)

    const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/couriers/${courierID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setLoading(false)
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Courier account updated successfully',
        visibilityTime: 4000, // Duration in milliseconds
        autoHide: true,
        topOffset: 50, // Adjust the top offset as needed
        customTextStyle: {
          fontSize: 30, // Set the font size for text1 and text2
        },
        customHeight:300,
      });
  

    }else{
      Toast.show({
        type:'error',
        position: 'top',
        text1: 'Error',
        text2: 'Account update failed, please try again later, or restart the app',
        visibilityTime: 4000, // Duration in milliseconds
        autoHide: true,
        topOffset: 50, // Adjust the top offset as needed
        customTextStyle: {
          fontSize: 30, // Set the font size for text1 and text2
        },
        customHeight:300,
  
      });
     }
  };
  const firstLetter = userRole.charAt(0)

  const firstLetterCap = firstLetter.toUpperCase()

  const remainingLetters = userRole.slice(1)

  const capitalizedWord = firstLetterCap + remainingLetters

  const renderForm = () => {
    if (loading) {
      return (
        <><Text style={styles.modalText}>Loading...</Text>
          <TextInput
            style={styles.modalInput}

            editable={false}
          />
          <Text style={styles.modalText}>Loading...:</Text>
          <TextInput
            style={styles.modalInput}
            editable={false}
          />



          <Text style={styles.modalText}>Phone:</Text>
          <TextInput
            style={styles.modalInput}
            editable={false}
          />

          {/* Add a dropdown for address selection */}
          <Text style={styles.modalText}>Loading...         </Text>

          <TextInput
            style={styles.modalInput}
            editable={false}
          />
        </>
      )
    } else {
      return (
        <><Text style={styles.modalText}>User Email (ReadOnly):</Text>
          <TextInput
            style={styles.modalInput}
            value={userData.email}
            editable={false}
          />
          <Text style={styles.modalText}>{capitalizedWord} Email:</Text>
          <TextInput
            style={styles.modalInput}
                        defaultValue={roleData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}


          />



          <Text style={styles.modalText}>Phone:</Text>
          <TextInput
            style={styles.modalInput}
            defaultValue={roleData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />

          {/* Add a dropdown for address selection */}
          <Text style={styles.modalText}>Address: </Text>
          <TextInput
            style={styles.modalInput}
            editable={false}
            value={addressName}
          />
        </>
      )
    }
  }
  // Function to handle submitting the form
  //THIS IS WRONG
  const submitForm = () => {
    // Check if it's a customer or courier and call the respective function
    if (userRole == 'customer') {
      createCustomer();
    } else if (userRole == 'courier') {
      createCourier();
    }

    // Close the modals
  };

  return (
    <SafeAreaProvider style={styles.accountContainer} >
        <View style={styles.headerContainer}>
        <Text style={styles.accountHeader}>Your Account</Text>

<Text style={styles.userInfoText}>User Name: {userData.name}</Text>
        </View>



        <View >
          {renderForm()}
          <Picker
          
            selectedValue={addressName}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemIndex)
              console.log(itemValue)
              setFormAddressID(itemIndex)
              setAddressName(itemValue)
              setFormData({ ...formData, address_id: itemIndex })

            }}
          ><Picker.Item label='Select'  />
            {
              addressData.map(pickerAddress => <Picker.Item key={pickerAddress.id} label={pickerAddress.street_address} value={pickerAddress.street_address} />,

              )

            }
          </Picker>

          <Pressable style={styles.modalSubmitButton} onPress={submitForm} ><Text>Submit</Text></Pressable>
          {/* <Pressable style={styles.modalCancelButton} onPress={() => { setCustomerModalVisible(false); setCourierModalVisible(false) }} ><Text>Cancel</Text></Pressable> */}
        </View>
      </SafeAreaProvider>

  );
};
const styles = StyleSheet.create({
  accountButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#DA583B',
    borderColor: '#222126',
    margin: 50,
    height: 50,
    width:'auto',
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
  modalInput: {
    height: 50,
    borderColor:'black',
    borderWidth:1,



  },
  accountText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  userInfoText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#222126',
    right:'10%',
    marginBottom:10
  },accountHeader: {
    fontSize: 40,
    lineHeight: 41,
    marginTop:20,
    fontWeight:'800',
    letterSpacing: 0.25,
    color: '#222126',
    marginBottom:20
  },
  modalView: {
    left: '10%',
    top: '20%',
    zIndex: 1,
    position: 'relative',
    height: '65%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: "#DA583B",
    borderWidth: 4,
    padding: 6,
    textAlign: 'center',

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
  }, accountContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    width: screenWidth,
    overflowX: 'auto',
    overflowY: 'auto',
  },headerContainer:{
 }

})

export default UserSelectionPage;
