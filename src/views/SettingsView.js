import React from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TestGroups } from "../components/GroupItem";

const renderGroup = ({ item }) => {
  return <Text style={settingsStyles.groupTextStyle}>{item.name}</Text>;
};

export default function SettingsView(props) {
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
          renderItem={renderGroup}
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
