import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Header, Card, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import axios from 'axios';

class ChatSelectionView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newChatText: "",
      textInputRef: undefined,
    }
  }

  createChat(group_id) {

    let update_parameters = {};
    update_parameters["chat_name"] = this.state.newChatText;

    axios.put(`${this.props.serverName}/api/groups/${group_id}/addchat`, update_parameters, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'Chat Created');
      this.state.newChatText = "";
      this.state.textInputRef.clear();

      axios.get(`${this.props.serverName}/api/user`, {
          headers: {
            'Authorization': `Token ${this.props.authenticationKey}`
          }
        })
        .then((res) => {
          this.props.setUserState(res.data);
          this.setState({ state: this.state });
        });
    })
    .catch(error => {
      Alert.alert("Chat not Created", error.response.data.response);
    })
  };

  changeChat(chatId) {
    axios.get(`${this.props.serverName}/api/messages/${chatId}`, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
      .then((res) => {
        this.props.setSelectedChat(chatId);
        this.props.setMessages(res.data);
      })
      .catch((res) => console.log(res));
  };
  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: 'Chat Selection',
            style: {
              color: '#fff',
              fontSize: 24,
            }
          }}
        />
        {this.props.group_list.map((item) => (
          <Card key={item.id.toString()}>
            <Text style={styles.cardTitle}>
              {item.name}
            </Text>
            <Card.Divider/>

            {item.chat_list.map((item) => (
              <ListItem
                key={item.id.toString()}
                bottomDivider
                containerStyle={(this.props.user.selected_chat === item.id) ? styles.selectedCard : styles.regularCard}
                onPress={() => this.changeChat(item.id)}>
                <ListItem.Content>
                  <ListItem.Title>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            <View style={styles.newChatView}>
              <TextInput style={styles.textInputStyle}
                placeholder="Enter new chat name"
                ref={(reference) => this.state.textInputRef = reference}
                onChangeText={(value) => this.state.newChatText = value}
              />
              <TouchableOpacity style={styles.newChatButton} onPress={() => this.createChat(item.id)}>
                <View style={styles.newChatTextContainers}>
                  <Text style={styles.newChatText}>
                    Create Chat
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </KeyboardAwareScrollView>
    );
  }        
}

// Getters: props.messageList
function mapStateToProps(state) {
  return {
    serverName: state.serverName,
    authenticationKey: state.authenticationKey,
    group_list: state.user.group_list,
    user: state.user,
  };
}

// Setters: props.newMessage("new message");
function mapDispatchToProps(dispatch) {
  return {
    setMessages: (list) => dispatch({ type: 'SET_MESSAGES', value: list }),
    setSelectedChat: (id) => dispatch({ type: 'SET_SELECTED_CHAT', value: id }),
    setUserState: (data) => dispatch({ type: 'SET_USER_STATE', value: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSelectionView);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: '#a3d2ca',
  },
  regularCard: {
    backgroundColor: 'white',
  },
  chat: {
    fontSize: 16,
  },
  newChatView: {
    padding: 20,
  },
  newChatButton: {
    backgroundColor: "forestgreen",
    alignItems: "center",
    height: 30, 
    width: 150,
  },
  newChatText: {
    color: "white",
  },
  newChatTextContainers: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5
  },
  textInputStyle: {
    height: 30,
    width: 150,
    alignSelf: "stretch",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
