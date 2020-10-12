import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

function SettingsView(props) {

  const [userNameText, setUserNameText] = useState("");
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const [confirmNewPasswordText, setConfirmNewPasswordText] = useState("");
  const [currentPasswordText, setCurrentPasswordText] = useState("");
  const [newGroupText, setNewGroupText] = useState("");

  const handleUserNameInput = (enteredText) => {
    setUserNameText(enteredText);
  }

  const handleFirstNameInput = (enteredText) => {
    setFirstNameText(enteredText);
  };

  const handleLastNameInput = (enteredText) => {
    setLastNameText(enteredText);
  };

  const handleNewPasswordInput = (enteredText) => {
    setNewPasswordText(enteredText);
  };

  const handleConfirmNewPasswordInput = (enteredText) => {
    setConfirmNewPasswordText(enteredText);
  }

  const handleCurrentPasswordInput = (enteredText) => {
    setCurrentPasswordText(enteredText);
  };

  const handleNewGroupInput = (enteredText) => {
    setNewGroupText(enteredText);
  };

  const saveChanges = () => {

    console.log("Saving Settings Changes!");
    
    //No Changes will be accepted without the current password entry being correct.
    if (props.user.password !== currentPasswordText) {
      console.log("Incorrect current password given");
      return;
    }
    else {
      console.log("Correct current password authenticated");
    }

    if(userNameText.length > 0) {
      props.setUsername(userNameText);
      console.log("New username: "  + userNameText);
    }

    if(firstNameText.length > 0) {
      props.setFirstname(firstNameText);
      console.log("New first name: "  + firstNameText);
    }

    if (lastNameText.length > 0) {
      props.setLastname(lastNameText);
      console.log("New last name: "  + lastNameText);
    }

    if (newPasswordText.length > 0 && confirmNewPasswordText.length > 0) {
      if (newPasswordText === confirmNewPasswordText) {
        props.setPassword(newPasswordText);
        console.log("New password: " + newPasswordText);
      }
      else {
        console.log("New password and confirm new password DO NOT MATCH")
      }
    }
  };

  const cancelChanges = () => {
    console.log("Cancel Settings Changes!");
    //ADD ABILITY TO EITHER REFRESH PAGE OR EXIT TO MESSAGEVIEW
  };

  const addNewGroup = () => {
    if(newGroupText.length > 0) {
      console.log("Adding New Group!");

      props.addGroup(newGroupText);
      console.log("New group: " + newGroupText);
    }
  };

  const removeGroup = () => {
    console.log("Remove Group Button Pressed!");
  };

  return (
    <KeyboardAwareScrollView style={settingsStyles.container}>
      {/*START OF USERNAME VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Username:</Text>
        <TextInput 
          style={settingsStyles.textInputStyle} 
          placeholder={props.user.username}
          onChangeText={handleUserNameInput}
          value={userNameText}
        />
      </View>
      {/*START OF FIRST NAME VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>First Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder={props.user.first_name}
          onChangeText={handleFirstNameInput}
          value={firstNameText}
        />
      </View>
      {/*START OF LAST NAME VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Last Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder={props.user.last_name}
          onChangeText={handleLastNameInput}
          value={lastNameText}
        />
      </View>
      {/*START OF UPDATE PASSWORD VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Updated Password:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder="Enter New Password"
          onChangeText={handleNewPasswordInput}
          value={newPasswordText}
          secureTextEntry={true}
        />
      </View>
      {/*START OF CONFIRM NEW PASSWORD VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Confirm New Password:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder="Enter New Password"
          onChangeText={handleConfirmNewPasswordInput}
          value={confirmNewPasswordText}
          secureTextEntry={true}
        />
      </View>
      {/*START OF OLD PASSWORD VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Current Password:</Text>
        <Text style={settingsStyles.textStyle}>(REQUIRED for Name/Password Changes)</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder="Enter Current Password"
          onChangeText={handleCurrentPasswordInput}
          value={currentPasswordText}
          secureTextEntry={true}
        />
      </View>
      {/*START OF GROUPS VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Current Groups:</Text>
        {props.user.groups.map((group, idx) => (
          <View style={settingsStyles.groupContainer}
            key={idx}>
            <Text style={settingsStyles.groupTextStyle}>{group.name}</Text>
            <TouchableOpacity style={settingsStyles.removeGroupOpacity}
              onPress={removeGroup}
            ><Text style={settingsStyles.removeGroupText}>Remove Group</Text></TouchableOpacity>
          </View>
        ))}
        <Text style={settingsStyles.textStyle}>New Group:</Text>
        <TextInput
          style={settingsStyles.textInputStyle}
          placeholder="Enter New Group"
          onChangeText={handleNewGroupInput}
          value={newGroupText}
        />
        <View style={settingsStyles.buttonContainer}>
          <Button
            color="gray"
            title="Add New Group"
            onPress={addNewGroup}
          />
        </View>
      </View>
      {/*START OF SAVE BUTTON VIEW*/}
      <View style={settingsStyles.buttonContainer}>
        <Button
          color="gray"
          title="Save Changes"
          onPress={saveChanges}
        />
      </View>
      {/*START OF CANCEL BUTTON VIEW*/}
      <View style={settingsStyles.buttonContainer}>
        <Button
          color="gray"
          title="Cancel"
          onPress={cancelChanges}
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
    setUsername: (username) =>
      dispatch({ type: "SET_USERNAME", value: username }),
    setFirstname: (name) => dispatch({ type: "SET_FIRSTNAME", value: name }),
    setLastname: (name) => dispatch({ type: "SET_LASTNAME", value: name }),
    setPassword: (password) =>
      dispatch({ type: "SET_PASSWORD", value: password }),
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
  groupContainer: {
    flexDirection: 'row'
  },
  removeGroupOpacity: {
    backgroundColor: 'gray',
    width: 120,
    borderWidth: 1,
    borderColor: "white"
  },
  removeGroupText: {
    color: "white",
    textAlign: "center"
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  groupTextStyle: {
    backgroundColor: "gainsboro",
    color: "black",
    borderColor: "black",
    width: 150,
    borderWidth: 1,
    textAlign: "center"
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
