import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Header, Card, ListItem } from 'react-native-elements';
import { connect } from "react-redux";
import axios from 'axios';

function ChatSelectionView(props) {


  const [newChatText, setNewChatText] = useState("");

  const createChat = (group_id) => {

    let update_parameters = {}
    update_parameters["chat_name"] = newChatText

    axios.put(`${props.serverName}/api/groups/${group_id}/addchat`, update_parameters, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'Chat Created')
      setNewChatText("")
    })
    .catch(error => {
      Alert.alert("Chat not Created", error.response.data.response)
    })
  };

  const changeChat = (chatId) => {
    axios.get(`${props.serverName}/api/messages/${chatId}`, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
      .then((res) => {
        props.setSelectedChat(chatId);
        props.setMessages(res.data);
      })
      .catch((res) => console.log(res));
  };

  //style={{ (setSelectedChat == item.id.toString()) : }}

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Chat Selection',
          style: {
            color: '#fff',
            fontSize: 24,
          }
        }}
      />

      <FlatList
        data={props.group_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card key={item.id.toString()}>
            <Text style={styles.cardTitle}>
              {item.name}
            </Text>
            <Card.Divider/>

            {item.chat_list.map((item) => (
              <ListItem
                key={item.id.toString()}
                bottomDivider
                containerStyle={(props.selectedChatId.toString() === item.id.toString()) ? styles.selectedCard : styles.regularCard}
                onPress={() => changeChat(item.id)}>
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
                onChangeText={(value) => setNewChatText(value)}
                value={newChatText}
              />
              <TouchableOpacity style={styles.newChatButton} onPress={() => createChat(item.id)}>
                <View style={styles.newChatTextContainers}>
                  <Text style={styles.newChatText}>
                    Create Chat
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />

    </View>
  );
}

// Getters: props.messageList
function mapStateToProps(state) {
  return {
    serverName: state.serverName,
    authenticationKey: state.authenticationKey,
    group_list: state.user.group_list,
    selectedChatId: state.selectedChatId,
  };
}

// Setters: props.newMessage("new message");
function mapDispatchToProps(dispatch) {
  return {
    setMessages: (list) => dispatch({ type: 'SET_MESSAGES', value: list }),
    setSelectedChat: (id) => dispatch({ type: 'SET_SELECTED_CHAT', value: id }),
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
