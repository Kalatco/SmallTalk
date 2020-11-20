import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, FlatList, Button} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {Card, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

function SettingsView(props) {

  const [userNameText, setUserNameText] = useState("");
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const [confirmNewPasswordText, setConfirmNewPasswordText] = useState("");
  const [currentPasswordText, setCurrentPasswordText] = useState("");
  const [newUserText, setNewUserText] = useState("");
  const [newGroupText, setNewGroupText] = useState("");

  const saveChanges = () => {

    let update_parameters = {}

    //No Changes will be accepted without the current password entry being correct.
    if (currentPasswordText.length > 0) {
      console.log("Current password provided: " + currentPasswordText);
      update_parameters["old_password"] = currentPasswordText
    }

    if(userNameText.length > 0) {
      console.log("New username provided: "  + userNameText);
      update_parameters["username"] = userNameText
    }

    if(firstNameText.length > 0) {
      console.log("New first name provided: "  + firstNameText);
      update_parameters["first_name"] = firstNameText
    }

    if (lastNameText.length > 0) {
      console.log("New last name provided: "  + lastNameText);
      update_parameters["last_name"] = lastNameText
    }

    if (newPasswordText.length > 0) {
      console.log("New password provided: "  + newPasswordText);
      update_parameters["new_password"] = newPasswordText
    }

    if (confirmNewPasswordText.length > 0) {
      console.log("New confirm password provided: "  + confirmNewPasswordText);
      update_parameters["new_password2"] = confirmNewPasswordText
    }


    let url = props.serverName+'/api/user/update'

    axios.put(url, update_parameters, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })

    axios.get(`${props.serverName}/api/user`, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
    .then(res => {
      props.setUserState(res.data);
    })
    .catch((res) => console.log(res))
  };

  const addUser = (group_id) => {
    
    let update_parameters = {}
    update_parameters["new_user"] = newUserText

    let url = props.serverName+'/api/groups/'
    url = url + group_id + '/add'

    axios.put(url, update_parameters, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
  }

  const deleteUser = (group_id, user_id) => {

    let update_parameters = {}
    
    let url = props.serverName+'/api/groups/'
    url = url + group_id + "/remove/" + user_id

    axios.put(url, update_parameters, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
  };

  const cancelChanges = () => {
    console.log("Cancel Settings Changes!");
    //ADD ABILITY TO EITHER REFRESH PAGE OR EXIT TO MESSAGEVIEW
  };

  const createGroup = () => {

    let update_parameters = {}
    update_parameters["group_name"] = newGroupText

    let url = props.serverName+'/api/groups/create'

    axios.put(url, update_parameters, {
      headers: {
        'Authorization': `Token ${props.authenticationKey}`
      }
    })
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
        {props.group_list.map((item1) => (
          <Card key={item1.id.toString()}>
            <Text style={settingsStyles.cardTitle}>
              {item1.name}
            </Text>
            <Card.Divider/>
            {item1.users.map((item2) => (
              <ListItem
                key={item2.username.toString()}
                bottomDivider>
                <ListItem.Content>
                  <View style={settingsStyles.rowContainer}>
                    <View style={settingsStyles.rowItem}>
                      <Text>
                        {item2.username}
                      </Text>
                    </View>
                    <View style={settingsStyles.rowItem}>
                      <Button title="delete" color="darkred" onPress={() => deleteUser(item1.id, item2.id)}/>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
            <Card.Divider/>
            <ListItem>
              <ListItem.Content style={settingsStyles.addUserContainer}>
                <View style={settingsStyles.rowContainer}>
                  <View style={settingsStyles.rowItem}>
                    <TextInput style={settingsStyles.textInputStyle}
                      placeholder="Enter username"
                      onChangeText={(value) => setNewUserText(value)}
                      value={newUserText}
                    />
                  </View>
                  <View style={settingsStyles.rowItem}>
                    <Button style={settingsStyles.addUser} title="Add user" color="forestgreen" onPress={() => addUser(item1.id)}/>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </Card>
        ))}
      </View>
      {/*START OF ADD NEW GROUP VIEW*/}
      <View style={settingsStyles.rowContainer}>
        <View style={settingsStyles.rowItem}>
          <TextInput style={settingsStyles.textInputStyle}
            placeholder="Enter new group name"
            onChangeText={(value) => setNewGroupText(value)}
            value={newGroupText}
          />
        </View>
        <View style={settingsStyles.rowItem}>
          <Button style={settingsStyles.createGroup} title="Create Group" color="forestgreen" onPress={() => createGroup()}/>
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
    group_list: state.user.group_list,
    authenticationKey: state.authenticationKey,
    serverName: state.serverName
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
    setUserState: (data) => dispatch({ type: 'SET_USER_STATE', value: data}),
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
    width: "45%",
    height: 40,
    margin: 10
  },
  addUserContainer: {
    width: 500,
    alignItems: "center",
    alignSelf: "stretch"
  },
  addUser: {
    width: 500,
    alignItems: "center",
    alignSelf: "stretch",
  },
  createGroup: {
    width: 250,
    alignItems: "center",
    alignSelf: "stretch",
  }
});
