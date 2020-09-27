import React, { useState, Component } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";
import Message from "./../components/message";
import {connect} from 'react-redux';

function MessageView(props) {
  const [enteredText, setEnteredText] = useState("");
  const [messageRef, setmessageRef] = useState(undefined);

  const goalInputHandler = (enteredText) => {
    setEnteredText(enteredText);
  };

  const addGoalHandler = () => {
    props.newMessage(enteredText);
    messageRef.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        ref={(ref) => (setmessageRef(ref))}
        onContentSizeChange={() => {
          messageRef.scrollToEnd({ animated: true });
        }}
        keyExtractor={(item, index) => `item: ${item}, index: ${index}`}
        data={props.messageList}
        renderItem={(itemData) => <Message content={itemData.item.value} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={goalInputHandler}
          value={enteredText}
        />
        <Button style={styles.container} title="ADD" onPress={addGoalHandler} />
      </View>
    </View>
  );
}

// Imported Values
function mapStateToProps(state) {
  return {
    messageList: state.messageList,
  };
}

// Dispatch Actions
function mapDispatchToProps(dispatch) {
  return {
    newMessage: (msg) => dispatch({ type: 'NEW_MESSAGE', value: msg }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageView);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
});
