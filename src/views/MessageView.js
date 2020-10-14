import React, { useState, Component } from "react";
import { FlatList, StyleSheet, TextInput, View, Button, Alert, Dimensions } from "react-native";
import Message from "./../components/message";
import { connect } from 'react-redux';

//function MessageView(props) {
class MessageView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      enteredText: "",
      messageRef: undefined,
      websocket: new WebSocket(`${this.props.websocketServerName}/message/${props.user.username}/`),
    }
  }

  // Load data from server
  async componentDidMount() {

    this.state.websocket.onmessage = (e) => {
      // a message was received
      const data = JSON.parse(e.data);
      console.log(data)
      if (this.props.selectedChatId == data.chat.id) {
        //this.props.newMessage(data);
      }
    };

    this.state.websocket.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    this.state.websocket.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
      Alert.alert("Connection closed")
    };
  }


  handleSendMessage = () => {

    try {
      this.state.websocket.send(JSON.stringify({
        'chat': this.props.selectedChatId,
        'message': this.state.enteredText,
      }));
    } catch(error) {
      console.log(error)
    }
    
    this.state.messageRef.scrollToEnd({ animated: true });
    this.state.enteredText = "";
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.messageContainer}>
          <FlatList
            ref={(ref) => this.state.messageRef = ref }
            onContentSizeChange={() => {
              this.state.messageRef.scrollToEnd({ animated: true });
            }}
            keyExtractor={(item, index) => `item: ${item}, index: ${index}`}
            data={this.props.messageList}
            renderItem={(itemData) => <Message content={itemData.item} />}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Message"
              onChangeText={(enteredText) => this.setState({enteredText})}
              value={this.state.enteredText}
            />
          </View>

          <View>
            <Button
              style={styles.sendButton}
              color="#5eaaa8"
              title="Send"
              onPress={this.handleSendMessage}
            />
          </View>
        </View>
      </View>
    );
  }
}

// Getters: props.messageList
function mapStateToProps(state) {
  return {
    selectedChatId: state.selectedChatId,
    messageList: state.messageList,
    serverName: state.serverName,
    websocketServerName: state.websocketServerName,
    authenticationKey: state.authenticationKey,
    user: state.user,
    messages: state.messages,
    isSignedin: state.isSignedin,
  };
}

// Setters: props.newMessage("new message");
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }), // console.log("pong");
    newMessage: (msg) => dispatch({ type: "NEW_MESSAGE", value: msg }),
    setAuthToken: (token) => dispatch({ type: 'SET_AUTH_TOKEN', value: token }),
    setUserState: (data) => dispatch({ type: 'SET_USER_STATE', value: data }),
    setChatMessages: (id) => dispatch({ type: 'SET_SELECTED_CHAT', value: id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageView);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: "center",
    backgroundColor:'#e8ded2',
  },
  messageContainer: {
    flex: 11,
    // justifyContent:'center',
    // alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: '#056676',

  },
  input: {
    width: 300,
    color:'#555555',
    paddingRight: 10, 
    paddingLeft: 10,
    paddingTop: 5,
    height: 32,
    borderColor: '#e8ded2',
    borderWidth:1, 
    borderRadius: 2,
    backgroundColor: '#ffffff',
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
