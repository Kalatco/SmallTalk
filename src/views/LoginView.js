import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect } from "react-redux";

function SigninView(props) {
  const [emailText, setEmailText] = useState("");
  const handleEmailInput = (enteredText) => {
    setEmailText(enteredText);
  };

  const [passwordText, setPasswordText] = useState("");
  const handlePasswordInput = (enteredText) => {
    setPasswordText(enteredText);
  };

  const [isValidLogin, setisValidLogin] = useState(false);

  const login = () => {
    
    props.setSignedIn(
      emailText === props.user.email && passwordText === props.user.password);
    setisValidLogin(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBoxContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={handleEmailInput}
          style={styles.textBox}
          value={emailText}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="Password"
          onChangeText={handlePasswordInput}
          value={passwordText}
          style={styles.textBox}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
        />

        <Button style={styles.button} title="Sign In" onPress={login} />
        {isValidLogin && (
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
  };
}

// Setters: props.setSignedIn(true);
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }), // console.log("pong");
    setSignedIn: (isSignedIn) =>
      dispatch({ type: "SET_SIGNED_IN", value: isSignedIn }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textBox: {
    fontSize: 20,
    alignSelf: "stretch",
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: color.grey,
    borderRadius: 5,
  },
  textBoxContainer: {
    position: "relative",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  touchableButton: {
    position: "absolute",
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  }, 
  invalidCredentials: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
});
