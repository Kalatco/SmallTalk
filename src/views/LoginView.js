import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { Image } from 'react-native-elements';
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Login from "../components/Login";
import Register from "../components/Register";

function SigninView(props) {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <ScrollView>
    <View style={styles.container}>

      <Image
        source={require('./../assets/smallTalk.png')}
        style={{ width: 400, height: 200 }}
      />
      {isLoginForm ? (
        <Login toggle={setIsLoginForm}/>     
      ) : (
        <Register toggle={setIsLoginForm}/>
      )}    
    </View>
  </ScrollView>
  );
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