import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { Input, Image } from 'react-native-elements';
import { connect } from "react-redux";
import axios from 'axios';

function SigninView(props) {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [isInvalidLogin, setisInvalidLogin] = useState(false);

  const login = () => {
    let formData = new FormData();
    // (Django won't let me rename 'username' to 'email')
    formData.append('username', emailText);
    formData.append('password', passwordText);

    // Create request for user auth token
    axios.post(`${props.serverName}/login`, formData)
      .then(res => {

        // Set the user token in store
        props.setAuthToken(res.data.token);

        // Once the auth token is recieved, access user data
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

              axios.get(`${props.serverName}/api/messages/${props.selectedChatId}`, {
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
    <View style={styles.container}>

      <Image
        source={require('./../assets/smallTalk.png')}
        style={{ width: 400, height: 200 }}
      />

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
        <Button style={styles.loginButton} title="Sign In" onPress={login} />
      </View>

      <View style={{ flex: 1, position: "relative" }}>
        {isInvalidLogin && (
            <View>
              <Text style={styles.invalidCredentials}>
                User email or password is incorrect
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

export default connect(mapStateToProps, mapDispatchToProps)(SigninView);

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
    alignSelf: "stretch",
    justifyContent: "center",
    marginHorizontal: 20,
    flex: 1,
  },
  inputStyle: {
    
  },
  loginButton: {
    borderRadius: 5,
  },
  invalidCredentials: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
});
