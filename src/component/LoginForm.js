import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Correct import statement

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object



  async function handleLogin () {
    console.log("something")

    try {
      // Perform POST request to your authentication endpoint
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      // Check if the login was successful
      if (response.ok) {
        // Call the onLogin callback with customer_id
        onLogin(data.customer_id);
        console.log("loginworked")
        navigation.navigate('Restaurants', {
          customer_id: data.customer_id,

        }
        
        );
      } else {
        console.log("didnt worked")

        // Handle unsuccessful login (display error message, etc.)
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '80%',
  },
});

export default LoginPage;

