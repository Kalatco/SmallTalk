import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from 'react-native-elements';


function Login(props) {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [isInvalidLogin, setisInvalidLogin] = useState(false);

    const loginRequest = () => {
        let formData = new FormData();
        // (Django won't let me rename 'username' to 'email')
        formData.append('username', emailText);
        formData.append('password', passwordText); 
    
        // Create request for user auth token
        axios.post(`${props.serverName}/login`, formData)
          .then(res => {
            // Set the user token in store
            props.setAuthToken(res.data.token);
    
            // Once the auth token is received, access user data
            if (res.data.token) {
              const authKey = res.data.token;
              axios.get(`${props.serverName}/api/user`, {
                headers: {
                  'Authorization': `Token ${authKey}`
                }
              })
                .then(res => {
                  // Save user data in store
                  props.setUserState(res.data);
    
                  axios.get(`${props.serverName}/api/messages/${res.data.selected_chat}`, {
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
          })
          .catch((res) => {
            console.log(res);
            setisInvalidLogin(true);
          });
      }

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <View style={styles.loginForm}>
                <Input
                    placeholder="Email"
                    style={styles.inputStyle}
                    leftIcon={{ type: 'Feather', name: 'email' }}
                    autoCorrect={false}
                    onChangeText={(input) => setEmailText(input)}
                />
                <Input
                    placeholder="Password"
                    style={styles.inputStyle}
                    leftIcon={{ type: 'Feather', name: 'lock' }}
                    secureTextEntry={true}
                    onChangeText={(input) => setPasswordText(input)}
                />
                <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.homeScreenOpacity} onPress={loginRequest}>
                        <Text style={styles.buttonTextStyle}>
                            Sign In
                        </Text> 
                    </TouchableOpacity>
                </View>

                <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => props.toggle(false)}>
                        <Text style={styles.buttonTextStyle}>
                            Register Form
                        </Text> 
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, position: "relative" }}>
                {isInvalidLogin && (
                    <View>
                        <Text style={styles.invalidCredentials}>
                            Invalid username or password
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

// Getters: props.user.password OR props.user.email
function mapStateToProps(state) {
    return {
      user: state.user,
      serverName: state.serverName,
      authenticationKey: state.authenticationKey,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
