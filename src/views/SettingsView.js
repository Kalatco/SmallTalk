import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, FlatList, Button, Alert} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {Card, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

class SettingsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNameText: "",
      firstNameText: "",
      lastNameText: "",
      newPasswordText: "",
      confirmPasswordText: "",
      currentPasswordText: "",
      newUserText: "",
      newGroupText: "",
      textInputRef: undefined,
    }
  }

  saveChanges = () => {

    let update_parameters = {}

    //No Changes will be accepted without the current password entry being correct.
    if (this.state.currentPasswordText && this.state.currentPasswordText.length > 0) {
      update_parameters["old_password"] = this.state.currentPasswordText
    }

    if(this.state.userNameText && this.state.userNameText.length > 0) {
      update_parameters["username"] = this.state.userNameText
    }

    if(this.state.firstNameText && this.state.firstNameText.length > 0) {
      update_parameters["first_name"] = this.state.firstNameText
    }

    if (this.state.lastNameText && this.state.lastNameText.length > 0) {
      update_parameters["last_name"] = this.state.lastNameText
    }

    if (this.state.newPasswordText && this.state.newPasswordText.length > 0) {
      update_parameters["new_password"] = this.state.newPasswordText
    }

    if (this.state.confirmPasswordText && this.state.confirmNewPasswordText.length > 0) {
      update_parameters["new_password2"] = this.state.confirmNewPasswordText
    }

    axios.put(`${this.props.serverName}/api/user/update`, update_parameters, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'Account Info Saved')
      this.currentPasswordText = ""
      this.newPasswordText = ""
      this.confirmPasswordText = ""

      axios.get(`${this.props.serverName}/api/user`, {
        headers: {
          'Authorization': `Token ${this.props.authenticationKey}`
        }
      })
      .then((res) => {
        this.props.setUserState(res.data);
        this.setState({ state: this.state });
      });
    })
    .catch(error => {
      Alert.alert("Save Failure", error.response.data.response)
    })
  };

  addUser = (group_id) => {
    
    let update_parameters = {}
    update_parameters["new_user"] = this.state.newUserText

    axios.put(`${this.props.serverName}/api/groups/${group_id}/add`, update_parameters, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'User Added: ' + this.state.newUserText)
      this.newUserText = ""
      this.state.textInputRef.clear();

      axios.get(`${this.props.serverName}/api/user`, {
        headers: {
          'Authorization': `Token ${this.props.authenticationKey}`
        }
      })
      .then((res) => {
        this.props.setUserState(res.data);
        this.setState({ state: this.state });
      })
    })
    .catch(error => {
      Alert.alert("Add user failed", error.response.data.response)
    })
  }

  deleteUser = (group_id, user_id) => {

    let update_parameters = {}

    axios.put(`${this.props.serverName}/api/groups/${group_id}/remove/${user_id}`, update_parameters, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'User Deleted')

      axios.get(`${this.props.serverName}/api/user`, {
        headers: {
          'Authorization': `Token ${this.props.authenticationKey}`
        }
      })
      .then((res) => {
        this.props.setUserState(res.data);
        this.setState({ state: this.state });
      });
    })
    .catch(error => {
      Alert.alert("Delete user failed", error.response.data.response)
    })
  };

  cancelChanges = () => {

    axios.get(`${this.props.serverName}/api/user`, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then((res) => {
      this.props.setUserState(res.data);
      this.setState({ state: this.state });
    });
  };

  createGroup = () => {

    let update_parameters = {}
    update_parameters["group_name"] = this.state.newGroupText

    axios.put(`${this.props.serverName}/api/groups/create`, update_parameters, {
      headers: {
        'Authorization': `Token ${this.props.authenticationKey}`
      }
    })
    .then(() => {
      Alert.alert('Attention', 'Group Created: ' + this.state.newGroupText)
      this.newGroupText = ""

      axios.get(`${this.props.serverName}/api/user`, {
        headers: {
          'Authorization': `Token ${this.props.authenticationKey}`
        }
      })
      .then((res) => {
        this.props.setUserState(res.data);
        this.setState({ state: this.state });
      });
    })
    .catch(error => {
      Alert.alert("Group Not Created", error.response.data.response)
    })
  };

  render () {
    return (
      <KeyboardAwareScrollView style={settingsStyles.container}>
        <Button
          onPress={() => this.props.logout()}
          title="Logout"
          color="#b23b3b"
        />
        {/*START OF USERNAME VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>Username:</Text>
          <TextInput 
            style={settingsStyles.textInputStyle} 
            placeholder={this.props.user.username}
            onChangeText={(value) => this.state.userNameText = value}
            value={this.userNameText}
          />
        </View>
        {/*START OF FIRST NAME VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>First Name:</Text>
          <TextInput style={settingsStyles.textInputStyle} 
            placeholder={this.props.user.first_name}
            onChangeText={(value) => this.state.firstNameText = value}
            value={this.firstNameText}
          />
        </View>
        {/*START OF LAST NAME VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>Last Name:</Text>
          <TextInput style={settingsStyles.textInputStyle} 
            placeholder={this.props.user.last_name}
            onChangeText={(value) => this.state.lastNameText = value}
            value={this.lastNameText}
          />
        </View>
        {/*START OF UPDATE PASSWORD VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>Updated Password:</Text>
          <TextInput style={settingsStyles.textInputStyle} 
            placeholder="Enter New Password"
            onChangeText={(value) => this.state.newPasswordText = value}
            value={this.newPasswordText}
            secureTextEntry={true}
          />
        </View>
        {/*START OF CONFIRM NEW PASSWORD VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>Confirm New Password:</Text>
          <TextInput style={settingsStyles.textInputStyle} 
            placeholder="Enter New Password"
            onChangeText={(value) => this.state.confirmPasswordText = value}
            value={this.confirmNewPasswordText}
            secureTextEntry={true}
          />
        </View>
        {/*START OF OLD PASSWORD VIEW*/}
        <View style={settingsStyles.inputContainers}>
          <Text style={settingsStyles.textStyle}>Current Password:</Text>
          <Text style={settingsStyles.textStyle}>(REQUIRED for Name/Password Changes)</Text>
          <TextInput style={settingsStyles.textInputStyle} 
            placeholder="Enter Current Password"
            onChangeText={(value) => this.state.currentPasswordText = value}
            value={this.currentPasswordText}
            secureTextEntry={true}
          />
        </View>
        {/*START OF GROUPS VIEW*/}
        <View>
          {this.props.group_list.map((item1) => (
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
                        <Button title="delete" color="darkred" onPress={() => this.deleteUser(item1.id, item2.id)}/>
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
                        ref={(reference) => this.state.textInputRef = reference}
                        onChangeText={(value) => this.state.newUserText = value}
                        value={this.newUserText}
                      />
                    </View>
                    <View style={settingsStyles.rowItem}>
                      <Button style={settingsStyles.addUser} title="Add user" color="forestgreen" onPress={() => this.addUser(item1.id)}/>
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
              onChangeText={(value) => this.state.newGroupText = value}
              value={this.newGroupText}
            />
          </View>
          <View style={settingsStyles.rowItem}>
            <Button style={settingsStyles.createGroup} title="Create Group" color="forestgreen" onPress={() => this.createGroup()}/>
          </View>
        </View>
        {/*START OF SAVE BUTTON VIEW*/}
        <View style={settingsStyles.buttonContainer}>
          <Button
            color="gray"
            title="Save Changes"
            onPress={this.saveChanges}
          />
        </View>
        {/*START OF CANCEL BUTTON VIEW*/}
        <View style={settingsStyles.buttonContainer}>
          <Button
            color="gray"
            title="Cancel"
            onPress={this.cancelChanges}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
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
    setUsername: (username) => dispatch({ type: "SET_USERNAME", value: username }),
    setFirstname: (name) => dispatch({ type: "SET_FIRSTNAME", value: name }),
    setLastname: (name) => dispatch({ type: "SET_LASTNAME", value: name }),
    setPassword: (password) => dispatch({ type: "SET_PASSWORD", value: password }),
    addGroup: (groupName) => dispatch({ type: "ADD_GROUP", value: groupName }),
    setUserState: (data) => dispatch({ type: 'SET_USER_STATE', value: data}),
    logout: () => dispatch({ type: "LOG_OUT"}),
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
