import React from "react";
import { FlatList, StyleSheet, TextInput, View, Alert } from "react-native";
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import Icon from 'react-native-vector-icons/Feather';
import Message from "./../components/message";
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';



//function MessageView(props) {
class MessageView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      enteredText: "",
      enteredImage: undefined,
      messageRef: undefined,
      webSocketStr: `${props.websocketServerName}/client?token=${props.authenticationKey}`,
      websocket: undefined,
      serverConnected: false,
      updateUIKey: 1,
      height: 0,
    }
  }

  // Load data from server on component load.
  async componentDidMount() {

    this.state.websocket = new WebSocket(this.state.webSocketStr);

    // Update UI with new server conneciton status
    this.setState({ state: this.state });

    this.state.websocket.onopen = (e) => {
      this.state.serverConnected = true;
    }

    this.state.websocket.onmessage = (e) => {
      // a message was received
      const data = JSON.parse(e.data);
      if (this.props.selectedChatId == data.chat.id) {
        this.props.newMessage(data);
      }
    };

    this.state.websocket.onclose = (e) => {

      if (e.message && !e.message.includes('403 Access denied')) {
        this.state.serverConnected = false;
        this.reconnectToServer();
      } else if (e.message && e.message.includes('403 Access denied')){
        Alert.alert(
          'Invalid account found',
          'The provided user account is not authorized on the server, please login again'
        );
      }
    };
  }

  // Destroy websocket connection on page leave.
  async componentWillUnmount() {
    this.state.websocket.close();
    this.state.serverConnected = false;
  }

  // When socket connection is closed, update UI with status, and attempt to reconnect.
  reconnectToServer() {
    const self = this;

    // Update UI with new server conneciton status
    this.setState({ state: this.state });

    // When the server is found again, reconnect websocket
    const connect = () => {
      this.state.websocket = new WebSocket(this.state.webSocketStr);
      this.state.serverConnected = true;

      // Update UI with new server conneciton status
      this.setState({ state: this.state });
      
      this.state.websocket.onopen = (e) => {
        this.state.serverConnected = true;
      }

      this.state.websocket.onmessage = (e) => {
        // a message was received
        const data = JSON.parse(e.data);
        if (this.props.selectedChatId == data.chat.id) {
          this.props.newMessage(data);
        }
      };

      this.state.websocket.onclose = (e) => {
        // connection closed
        this.state.serverConnected = false;
        this.reconnectToServer();
      };
    }

    // Attempt to talk to server until its reachable and connect websocket.
    const findServer = setInterval(() => {

      try {
        Promise
        .race([
          fetch(`${self.props.serverName}/api/ping`),
          new Promise((_, reject) => setTimeout(() => reject(), 1000))
        ])
        .then(() => {
          console.log('server found');
          connect();
          clearInterval(findServer);
        })
        .catch(() => {
          console.log('no server found');
        });
      } catch {
        console.log('error in connection attempt');
      }

    }, 3000);
  }

  handleSendMessage = () => {

    if(this.state.enteredText === '' && this.state.enteredImage === undefined) return;
    try {
      this.state.websocket.send(JSON.stringify({
        'chat': this.props.selectedChatId,
        'message': this.state.enteredText,
        'image': (this.state.enteredImage) ? `data:image/jpeg;base64,${this.state.enteredImage.base64}` : undefined
      }));
      this.setState({ height: 0 });
    } catch(error) {
      console.log(error)
    }

    this.state.enteredImage = undefined;
    this.state.messageRef.scrollToEnd({ animated: true });
    this.state.enteredText = "";
  };

  handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    })

    if(!result.cancelled) {
      this.state.enteredImage = result;
    }
  }

  render() {
    return (
      <View style={styles.screen}>

        {/* Indicates if the client is connected to the server's websocket */}
        <View
          key={this.state.updateUIKey}
          style={{
            ...styles.serverStatus,
            backgroundColor: `${(this.state.serverConnected) ? '#4BB543' : '#FF0000'}`
          }}
        />

        <View style={styles.messageContainer}>
          <FlatList
            ref={(ref) => this.state.messageRef = ref }
            onContentSizeChange={() => {
              this.state.messageRef.scrollToEnd({ animated: true });
            }}
            initialNumToRender={20}
            keyExtractor={(item, index) => `item: ${item}, index: ${index}`}
            data={this.props.messageList}
            renderItem={(itemData) => <Message content={itemData.item} user={this.props.user} server={this.props.serverName}/>}
          />
        </View>

        <KeyboardAccessoryView
          androidAdjustResize
          alwaysVisible={true}
        >
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Message"
              multiline={true}
              onChangeText={(enteredText) => this.setState({enteredText})}
              value={this.state.enteredText}
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              style={[styles.input, {height: Math.max(35, this.state.height)}]}
            />
            <Icon
              color="#5eaaa8"
              name="image"
              style={styles.sendButton}
              size={40}
              onPress={this.handleImage}
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
  serverStatus: {
    position: 'absolute',
    right: 3,
    top: 3,
    borderRadius: 15,
    height: 17,
    width: 17,
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
    width: '75%',
  },
  sendButton: {
    minWidth: 45,
    flexShrink: 1,
    padding: 3,
  },
});
