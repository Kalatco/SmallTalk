import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Groups</Text>

      <FlatList
        data={props.group_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id.toString()}>
            <Text style={styles.group}>
              {item.name}
            </Text>

            {item.chat_list.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => changeChat(item.id)}
              >
                <Text style={styles.chat}>
                  #{item.name}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
        )}
      />
      <Button
        title="Test!"
        onPress={props.testCommand}
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
  };
}

// Setters: props.newMessage("new message");
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }),
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
  header: {
    fontSize: 40,
  },
  group: {
    fontSize: 24,
  },
  chat: {
    fontSize: 16,
  }
});
