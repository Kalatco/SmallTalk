import React from "react";
import { FlatList, StyleSheet, TextInput, View, Button, Alert } from "react-native";
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import Icon from 'react-native-vector-icons/Feather';
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
        this.props.newMessage(data);
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

    if(this.state.enteredText === '') return;
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
            renderItem={(itemData) => <Message content={itemData.item} user={this.props.user.username}/>}
          />
        </View>

        <KeyboardAccessoryView
          androidAdjustResize
          alwaysVisible={true}
        >
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Message"
              onChangeText={(enteredText) => this.setState({enteredText})}
              value={this.state.enteredText}
            />
            <Icon
              color="#5eaaa8"
              name="send"
              style={styles.sendButton}
              size={40}
              onPress={this.handleSendMessage}
            />
          </View>
        </KeyboardAccessoryView>
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
    backgroundColor:'#e8ded2',
  },
  messageContainer: {
    flex: 11,
  },
  textInputView: {
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#056676',
  },
  input: {
    flexGrow: 1,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    color:'#555555',
    backgroundColor: '#ffffff',
  },
  sendButton: {
    minWidth: 45,
    flexShrink: 1,
    padding: 3,
  },
});
