import React from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SettingsGroupItem from "./../components/SettingsGroupItem";
import { connect } from "react-redux";

const TestGroups = [
  {
    id: "1",
    name: "group 1",
  },
  {
    id: "2",
    name: "group 2",
  },
  {
    id: "3",
    name: "group 3",
  },
  {
    id: "4",
    name: "group 4",
  },
  {
    id: "5",
    name: "group 5",
  },
  {
    id: "6",
    name: "group 6",
  },
  {
    id: "7",
    name: "group 7",
  },
];


function SettingsView(props) {
  return (
    <KeyboardAwareScrollView style={settingsStyles.container}>
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Username:</Text>
        <TextInput style={settingsStyles.textInputStyle} />
        {/* ADD JSX LATER TO GET USERNAME*/}
      </View>
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>First Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} />
        {/* ADD JSX LATER TO GET FIRST NAME*/}
      </View>
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Last Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} />
        {/* ADD JSX LATER TO GET LAST NAME*/}
      </View>
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Update Password:</Text>
        <TextInput style={settingsStyles.textInputStyle} />
        {/* ADD JSX LATER TO GET LAST NAME*/}
      </View>
      {/*START OF GROUPS VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Current Groups:</Text>
        <FlatList
          style={settingsStyles.flatListStyle}
          data={TestGroups}
          renderItem={(itemData) => <SettingsGroupItem content={itemData} /> }
        />
        <Text style={settingsStyles.textStyle}>New Group:</Text>
        <TextInput
          style={settingsStyles.textInputStyle}
          onChangeText={() => console.log("New group text field changed.")}
        />
        {/* ADD JSX LATER TO GET LAST NAME*/}
        <View style={settingsStyles.buttonContainer}>
          <Button
            color="gray"
            title="Add New Group"
            onPress={() =>
              console.log("Add New Group button pressed! CHANGE LATER")
            }
          />
          {/* ADD JSX LATER TO HANDLE ON PRESS*/}
        </View>
      </View>
      <View style={settingsStyles.buttonContainer}>
        <Button
          color="gray"
          title="Save Changes"
          onPress={() => console.log("Save button pressed! CHANGE LATER")}
        />
        {/* ADD JSX LATER TO HANDLE ON PRESS*/}
      </View>
      <View style={settingsStyles.buttonContainer}>
        <Button
          color="gray"
          title="Cancel"
          onPress={() => console.log("Cancel button pressed! CHANGE LATER")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

// Getters: props.user
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

// Setters: props.setUsername("username");
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }), // console.log("pong");
    setUsername: (username) => dispatch({ type: "SET_USERNAME", value: username }),
    setFirstname: (name) => dispatch({ type: "SET_FIRSTNAME", value: name }),
    setLastname: (name) => dispatch({ type: "SET_LASTNAME", value: name }),
    setPassword: (password) => dispatch({ type: "SET_PASSWORD", value: password }),
    addGroup: (groupName) => dispatch({ type: "ADD_GROUP", value: groupName }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainers: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  groupTextStyle: {
    color: "black",
    fontWeight: "bold",
  },
  textInputStyle: {
    height: 30,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  flatListStyle: {
    backgroundColor: "gainsboro",
    maxHeight: 60,
    width: 200,
    borderColor: "gray",
    borderWidth: 2,
  },
});
