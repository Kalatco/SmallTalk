import React, { useState, Component } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";
import Message from "./../components/message";
import { connect } from "react-redux";

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

  const handleEnteredText = (enteredText) => {
    setEnteredText(enteredText);
  };

  const handleSendMessage = async () => {
    props.newMessage(enteredText);
    messageRef.scrollToEnd({ animated: true });
    setEnteredText("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.messageContainer}>
        <FlatList
          ref={(ref) => setmessageRef(ref)}
          onContentSizeChange={() => {
            messageRef.scrollToEnd({ animated: true });
          }}
          keyExtractor={(item, index) => `item: ${item}, index: ${index}`}
          data={props.messageList}
          renderItem={(itemData) => <Message content={itemData.item.value} />}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            placeholder="Message"
            onChangeText={handleEnteredText}
            value={enteredText}
          />
        </View>

        <View>
          <Button
            style={styles.sendButton}
            title="Send"
            onPress={handleSendMessage}
          />
        </View>
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
    newMessage: (msg) => dispatch({ type: "NEW_MESSAGE", value: msg }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageView);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    padding: 50,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    marginHorizontal: 5,
    paddingRight: 15,
    borderRadius: 5,
  },
});
