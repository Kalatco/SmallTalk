import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";

function SigninView(props) {

  const login = () => {
    console.log('logging in!');
  }

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button
        style={styles.button}
        title="Sign In"
        onPress={login}
      />
    </View>
  );
};

// Getters: props.user.password OR props.user.username
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

// Setters: props.setSignedIn(true);
function mapDispatchToProps(dispatch) {
  return {
    testCommand: () => dispatch({ type: "PING" }), // console.log("pong");
    setSignedIn: (isSignedIn) => dispatch({ type: "SET_SIGNED_IN", value: isSignedIn}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
