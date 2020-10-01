import React, { useState, Component } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";
import Message from "./../components/message";
import {connect} from 'react-redux';

/**
 * Fake API Call
 * 
 * This JavaScript Object (In Json format) represents the data that a server
 * can potentially send to this phone app or anywhere. So in the code below, 
 * we have a Chats and a Users API call data, The programmer can access the data 
 * inside and display it on the screen, depending on which information they
 * need to show to the user. For example, A user looking at Chat with id #2,
 * would not want to see data made for Chat #1, each message contains a User ID,
 * so the message would need to access the API to see the username of who
 * send the message.
 */
const FAKE_API_CALL = {
  chat_messages_api_call: [
    {
      chatId: 1,
      messages: [
        {
          messageId: 1,
          message: "first message!",
          authorId: 1,
          created: "2020-09-27 00:02:31",
        },
        {
          messageId: 2,
          message: "second message!",
          authorId: 2,
          created: "2020-09-27 00:02:31",
        },
        {
          messageId: 3,
          message: "another message!",
          authorId: 1,
          created: "2020-09-27 00:02:31",
        },
      ],
    },
    {
      chatId: 2,
      messages: [
        {
          messageId: 4,
          message: "first message! of the second chat",
          authorId: 1,
          created: "2020-09-27 00:02:31",
        },
        {
          messageId: 5,
          message: "second message!",
          authorId: 2,
          created: "2020-09-27 00:02:31",
        },
        {
          messageId: 6,
          message: "first message!",
          authorId: 2,
          created: "2020-09-27 00:02:31",
        },
      ],
    },
  ],
  users_api_call: [
    {
      userId: 1,
      username: "firstUser",
    },
    {
      userId: 2,
      username: "secondUser",
    },
    {
      userId: 3,
      username: "thirdUser",
    },
  ],
};


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
