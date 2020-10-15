import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { Header, Card, ListItem } from 'react-native-elements';
import { connect } from "react-redux";
import axios from 'axios';

function ChatSelectionView(props) {

  const changeChat = (chatId) => {
    axios.get(`${props.serverName}/messenger/messages/${chatId}`, {
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
  }
});
