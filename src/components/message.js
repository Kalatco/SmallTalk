import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Message = (props) => {

  return (
    <View style={styles.messageStyle}>
      <Text>{props.content.text}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageStyle: {
    fontSize: 18,
    margin: 5,
    padding: 10,
    alignSelf: "flex-end",
    color: "white",
    backgroundColor: "gray",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
