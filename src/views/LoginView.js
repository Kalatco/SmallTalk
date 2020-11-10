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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

function SigninView(props) {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [isInvalidLogin, setisInvalidLogin] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirm_passwordReg, setconfirm_passwordReg] = useState("");
  const [first_nameReg, setfirst_nameReg] = useState("");
  const [last_nameReg, setlast_nameReg] = useState("");
  
  const login = () => {
    console.log("***I AM HERE***");
    let formData = new FormData();
    // (Django won't let me rename 'username' to 'email')
    formData.append('username', emailText);
    formData.append('password', passwordText);

    // Create request for user auth token
    axios.post(`${props.serverName}/login`, formData)
      .then(res => {
        console.log("Reading from server");
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

  const register = () => {
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
      })
      .catch((res) => {
        console.log(res);
      })
  }


  return (
    <View style={styles.container}>

      <Image
        source={require('./../assets/smallTalk.png')}
        style={{ width: 400, height: 200 }}
      />
      {isLoginForm ? (
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
          <TouchableOpacity style={styles.homeScreenOpacity} onPress={login}>
            <Text style={styles.buttonTextStyle}>
              Sign In
            </Text> 
          </TouchableOpacity>
        </View>

        <View style={styles.loginButton}>
          <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => setIsLoginForm(false)}>
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
                User email or password is incorrect
              </Text>
            </View>
          )}
      </View>
      </View>) : (
        <View>
          <Text style={styles.inputStyle}>Email:</Text>
          <TextInput  
            placeholder="Email"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setEmailReg(input)}/> 

          <Text style={styles.inputStyle}>Username:</Text>
          <TextInput  
            placeholder="username"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setUsernameReg(input)}/>  

          <Text style={styles.inputStyle}>Password:</Text>
          <TextInput  
            placeholder="password"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setPasswordReg(input)}/>  

          <Text style={styles.inputStyle}>Confirm password:</Text>
          <TextInput  
            placeholder="confirm_password"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setconfirm_passwordReg(input)}/>

          <Text style={styles.inputStyle}>First name:</Text>
          <TextInput  
            placeholder="first_name"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setfirst_nameReg(input)}/>

          <Text style={styles.inputStyle}>Last name:</Text>
          <TextInput  
            placeholder="last_name"
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={(input) => setlast_nameReg(input)}/>

            <View style={styles.registerButton}>
              <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => register()}>
                <Text style={styles.buttonTextStyle}>
                  Register
                </Text> 
              </TouchableOpacity>
            </View>
            <View style={styles.loginButton}> 
              <TouchableOpacity style={styles.homeScreenOpacity} onPress={() => setIsLoginForm(true)}>
                <Text style={styles.buttonTextStyle}>
                  Login Form
                </Text> 
              </TouchableOpacity>
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
      )}
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
    width: 350,
    justifyContent: "center",
    marginHorizontal: 5,
    flex: 1,
  },
  inputStyle: {
    color: "black",
    fontWeight: "bold", 
    justifyContent: "center",
    textAlign: "left"
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
});