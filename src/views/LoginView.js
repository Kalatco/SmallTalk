import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";


const FAKE_USERNAME = 'admin';
const FAKE_PASSWORD = 'password';

export default function SigninView() {

  const login = () => {
    console.log('logging in!');
  }

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button
        style={styles.button}
        title="Sign In"
        onPress={login}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
