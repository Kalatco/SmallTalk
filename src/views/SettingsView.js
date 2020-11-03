import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, FlatList, Button} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {Card, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingsView(props) {

  const [userNameText, setUserNameText] = useState("");
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const [confirmNewPasswordText, setConfirmNewPasswordText] = useState("");
  const [currentPasswordText, setCurrentPasswordText] = useState("");
  const [newGroupText, setNewGroupText] = useState("");

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
          onChangeText={(value) => setUserNameText(value) }
          value={userNameText}
        />
      </View>
      {/*START OF FIRST NAME VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>First Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder={props.user.first_name}
          onChangeText={(value) => setFirstNameText(value)}
          value={firstNameText}
        />
      </View>
      {/*START OF LAST NAME VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Last Name:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder={props.user.last_name}
          onChangeText={(value) => setLastNameText(value)}
          value={lastNameText}
        />
      </View>
      {/*START OF UPDATE PASSWORD VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Updated Password:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder="Enter New Password"
          onChangeText={(value) => setNewPasswordText(value)}
          value={newPasswordText}
          secureTextEntry={true}
        />
      </View>
      {/*START OF CONFIRM NEW PASSWORD VIEW*/}
      <View style={settingsStyles.inputContainers}>
        <Text style={settingsStyles.textStyle}>Confirm New Password:</Text>
        <TextInput style={settingsStyles.textInputStyle} 
          placeholder="Enter New Password"
          onChangeText={(value) => setConfirmNewPasswordText(value)}
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
          onChangeText={(value) => setCurrentPasswordText(value)}
          value={currentPasswordText}
          secureTextEntry={true}
        />
      </View>
      {/*START OF GROUPS VIEW*/}
      <View>
        <FlatList
          data={props.group_list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card key={item.id.toString()}>
              <Text style={settingsStyles.cardTitle}>
                {item.name}
              </Text>
              <Card.Divider/>
              {item.users.map((item) => (
                <ListItem
                  key={item.username.toString()}
                  bottomDivider
                  onPress={() => changeChat(item.username)}>
                  <ListItem.Content>
                    <View style={settingsStyles.rowContainer}>
                      <View style={settingsStyles.rowItem}>
                        <Text>
                          {item.username}
                        </Text>
                      </View>
                      <View style={settingsStyles.rowItem}> 
                        <Button title="delete" color="darkred"/>
                      </View>
                    </View>                  
                  </ListItem.Content>
                </ListItem>
              ))}
              <Card.Divider/>
              <ListItem>
                <ListItem.Content style={settingsStyles.addUserContainer}>
                  <Button sytle={settingsStyles.addUser} title="Add user" color="forestgreen"/>
                </ListItem.Content>
              </ListItem>
            </Card>
          )}
        />       
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
    group_list: state.user.group_list,
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
    backgroundColor:'#e8ded2',
  },
  inputContainers: {
    backgroundColor:'#e8ded2',
    alignItems: "center",
    padding: 8,
  },
  buttonContainer: {
    backgroundColor:'#e8ded2',
    alignItems: "center",
    alignSelf: "stretch",
    padding: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  groupTextStyle: {
    backgroundColor: "gainsboro",
    color: "black",
    borderColor: "black",
    alignSelf: "stretch",
    borderWidth: 1,
    textAlign: "center"
  },
  textInputStyle: {
    height: 30,
    alignSelf: "stretch",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  flatListStyle: {
    backgroundColor: "gainsboro",
    maxHeight: 60,
    width: 200,
    borderColor: "gray",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItem: {
    width: "40%",
    height: 40,
  },
  addUserContainer: {
    width: 500,
    alignItems: "center",
    alignSelf: "stretch",
  },
  addUser: {
    width: 500,
    alignItems: "center",
    alignSelf: "stretch",
  },  
});
