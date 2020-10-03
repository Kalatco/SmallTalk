import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ChatSelection() {

  return (
    <View style={styles.container}>
      <Text>Chat selection!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
