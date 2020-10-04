import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

function ChatSelectionView(props) {

  return (
    <View style={styles.container}>
      <Text>Chat selection!</Text>

      {props.groups.map((group, idx) => (
        <Text key={idx}>
          {group.name}
        </Text>
      ))}

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
    groups: state.user.groups,
  };
}

// Setters: props.newMessage("new message");
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSelectionView);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
