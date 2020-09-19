import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = props => {
  return (
    <View style={styles.messageStyle}>
      <Text>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageStyle: {
    padding: 10,
    marginVertical: 2,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  }
})

export default Message;
