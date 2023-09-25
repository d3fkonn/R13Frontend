import React from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';

function LoginForm() {
  return (
    <View>
      <Text> Login <br />Welcome Back! </Text>
      <TextInput
        placeholder="Email" />
      <TextInput
        secureTextEntry={true}
        placeholder="Password" />
    </View>

  );
}

export default LoginForm;