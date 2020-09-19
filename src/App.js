import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, Button } from 'react-native';

import Message from './components/message';

export default function App() {

  const [enteredText, setEnteredText] = useState('');
  const [messageList, setMessageList] = useState([]);
  //const [msgIndex, setMsgIndex] = useState(1);
  //const [messageRef, setmessageRef] = useState(undefined);

  let index = 1;
  let messageRef = undefined;

  const goalInputHandler = enteredText => {
    setEnteredText(enteredText);
  }

  const addGoalHandler = () => {
    setMessageList(currentGoals => [
      ...currentGoals,
      { id: index++, value: enteredText }
    ]);
    messageRef.scrollToEnd({animated: true})
  };

  return (
    <View style={styles.screen}>
      <FlatList
        ref={ref => messageRef = ref}
        onContentSizeChange={() => {
          messageRef.scrollToEnd({ animated: true });
        }}
        keyExtractor={(item, index) => `item: ${item}, index: ${index}`}
        data={messageList}
        renderItem={itemData => <Message content={itemData.item.value} /> }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={goalInputHandler}
          value={enteredText}
        />
        <Button
          style={styles.container}
          title="ADD"
          onPress={addGoalHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
});
