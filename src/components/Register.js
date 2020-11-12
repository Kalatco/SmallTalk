import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

function Register(props) {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirm_passwordReg, setconfirm_passwordReg] = useState("");
    const [first_nameReg, setfirst_nameReg] = useState("");
    const [last_nameReg, setlast_nameReg] = useState("");
    const [isInvalidRegistration, setIsInvalidRegistration] = useState(false);
    const [InvalidRegistrationMessage, setInvalidRegistrationMessage] = useState("");
    const [emailReg, setEmailReg] = useState("");

    const registerRequest = () => {
        let formData = new FormData();
        formData.append('email', emailReg);
        formData.append('username', usernameReg);
        formData.append('password', passwordReg);
        formData.append('password2', confirm_passwordReg);
        formData.append('first_name', first_nameReg);
        formData.append('last_name', last_nameReg);
    
        axios.post(`${props.serverName}/register`, formData)
          .then((res) => {
            props.setAuthToken(res.data.token);
    
            // Once the auth token is received, access user data
            if (res.data.token) {
              const authKey = res.data.token;
              axios.get(`${props.serverName}/messenger/user`, {
                headers: {
                  'Authorization': `Token ${authKey}`
                }
              })
                .then(res => {
                  // Save user data in store
                  props.setUserState(res.data);
    
                  axios.get(`${props.serverName}/messenger/messages/${props.selectedChatId}`, {
                    headers: {
                      'Authorization': `Token ${authKey}`
                    }
                  })
                    .then((res) => {
                      props.setMessages(res.data)
                    })
                    .catch((res) => console.log(res));
                  // Signin to program
                  props.setSignedIn(true);
                })
                .catch((res) => console.log(res));
            }
            else {
              // Error occured in 200 response, display invalid fields to user
              setIsInvalidRegistration(true);
              let errorMessage = "Invalid: \n";
              for (const [key, value] of Object.entries(res.data)) {
    
                if (Array.isArray(value)) {
                  errorMessage += `${key.toString()}: ${value[0]}\n`
                } else {
                  errorMessage += `${key.toString()}\n`
                }
              }
              setInvalidRegistrationMessage(errorMessage);
            }
          })
          .catch((res) => {
            setIsInvalidRegistration(true);
            setInvalidRegistrationMessage("Server issue encountered");
          })
      } 

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Text style={styles.inputStyle}>Email:</Text>
            <TextInput  
                placeholder="Email"
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={(input) => setEmailReg(input)}/> 

            <Text style={styles.inputStyle}>Username:</Text>
            <TextInput  
                placeholder="username"
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={(input) => setUsernameReg(input)}/>  

            <Text style={styles.inputStyle}>Password:</Text>
            <TextInput  
                placeholder="password"
                style={styles.textInput}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(input) => setPasswordReg(input)}/>  

            <Text style={styles.inputStyle}>Confirm password:</Text>
            <TextInput  
                placeholder="confirm_password"
                style={styles.textInput}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(input) => setconfirm_passwordReg(input)}/>

            <Text style={styles.inputStyle}>First name:</Text>
            <TextInput  
                placeholder="first_name"
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={(input) => setfirst_nameReg(input)}/>

            <Text style={styles.inputStyle}>Last name:</Text>
            <TextInput  
                placeholder="last_name"
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={(input) => setlast_nameReg(input)}/>

            <View style={styles.registerButton}>
                <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => registerRequest()}>
                    <Text style={styles.buttonTextStyle}>
                        Register
                    </Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.loginButton}> 
                <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => props.toggle(true)}>
                    <Text style={styles.buttonTextStyle}>
                        Login Form
                    </Text> 
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, position: "relative" }}>
                {isInvalidRegistration && (
                    <View>
                        <Text style={styles.invalidCredentials}>
                            { InvalidRegistrationMessage }
                        </Text>
                    </View>
                )}
            </View> 
        </View>
    );
}

// Getters: props.user.password OR props.user.email
function mapStateToProps(state) {
    return {
      user: state.user,
      serverName: state.serverName,
      authenticationKey: state.authenticationKey,
      selectedChatId: state.selectedChatId,
    };
  }
  
  // Setters: props.setSignedIn(true);
  function mapDispatchToProps(dispatch) {
    return {
      testCommand: () => dispatch({ type: "PING" }), // console.log("pong");
      setSignedIn: (isSignedIn) => dispatch({ type: "SET_SIGNED_IN", value: isSignedIn}),
      setAuthToken: (token) => dispatch({ type: 'SET_AUTH_TOKEN', value: token }),
      setUserState: (data) => dispatch({ type: 'SET_USER_STATE', value: data }),
      setMessages: (list) => dispatch({ type: 'SET_MESSAGES', value: list }),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 3,
    },
    logoStyle: {
      width: 400,
      height: 200,
      flex: 1,
      position: "relative",
    },
    loginForm: {
      position: "relative",
      width: 350,
      justifyContent: "center",
      marginHorizontal: 5,
      flex: 1,
    },
    inputStyle: {
      color: "black",
      fontWeight: "bold", 
      justifyContent: "center",
      textAlign: "left",
      fontSize: 18,
    },
    loginButton: {
      borderRadius: 5,
      padding: 5,
      alignItems: "center",
    },
    invalidCredentials: {
      color: "red",
      textAlign: "center",
      marginTop: 5,
    },
    registerButton: {
      borderRadius: 5,
      padding: 5,
    },
    homeScreenOpacity: {
      backgroundColor: 'gray',
      width: 152,
      borderWidth: 1,
      borderColor: "black",
    },
    buttonTextStyle: {
      backgroundColor: "red",
      color: "white",
      borderColor: "black",
      width: 150,
      height: 30,
      borderWidth: 1,
      textAlign: "center",
    },
    textInput: {
      color: "black",
      fontWeight: "bold", 
      justifyContent: "center",
      textAlign: "left",
      fontSize: 14,
    },
  });

