import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Message = (props) => {
  console.log(props.content)
  return (
    <View>
      <View style={
        props.content.author == 'me' ?
        styles.selfUserName : styles.otherUserName
      }>
        <Text>{props.content.author}</Text>
      </View>
      <View style={
          props.content.author == 'me' ?
          styles.selfMessageStyle : styles.otherMessageStyle
      }>
        <Text>{props.content.message}</Text>
      </View>
        <View style={
        props.content.author == 'me' ?
        styles.selfTimeStamp : styles.otherTimeStamp
        }> 
          <Text>{props.content.created}</Text>
        </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  selfUserName:{
    fontSize: 6,
    alignSelf:'flex-end',
  },
  selfMessageStyle: {
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
  selfTimeStamp: {
    fontSize: 6,
    alignSelf: 'flex-end',
  },
  otherUserName:{
    fontSize: 6,
    alignSelf:'flex-start',
  },
  otherMessageStyle: {
    fontSize: 18,
    margin: 5,
    padding: 10,
    alignSelf: "flex-start",
    color: "white",
    backgroundColor: "dodgerblue",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  otherTimeStamp: {
    fontSize: 6,
    alignSelf: 'flex-start',
  },
});
