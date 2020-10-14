import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Message = (props) => {
  console.log(props.content)
  return (
    <View>
      <View style={
        props.content.sender.username == "testUser1" ?
        styles.selfUserName : styles.otherUserName
      }>
        <Text>{props.content.sender.username}</Text>
      </View>
      <View style={
          props.content.sender.username == 'testUser1' ?
          styles.selfMessageStyle : styles.otherMessageStyle
      }>
        <Text>{props.content.text}</Text>
      </View>
        <View style={
        props.content.sender.otherUserName == 'testUser1' ?
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
    backgroundColor: "#5eaaa8",
    borderWidth: 1,
    borderColor: "#5eaaa8",
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
    backgroundColor: "#a3d2ca",
    borderWidth: 1,
    borderColor: "#a3d2ca",
    borderRadius: 10,
    overflow: "hidden",
  },
  otherTimeStamp: {
    fontSize: 6,
    alignSelf: 'flex-start',
  },
});
