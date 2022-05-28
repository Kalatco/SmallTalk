import React from "react";
import { Button, Text, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Feather';
import { Provider, connect } from "react-redux";
import { store } from "./store/index";

import SigninView from "./views/LoginView";
import SettingsView from "./views/SettingsView";
import MessageView from "./views/MessageView";
import ChatSelectionView from "./views/ChatSelectionView";

/*
  Stacks - each one contains a pointer to a view
*/

const LoginStack = createStackNavigator();
const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      name="Signin"
      component={SigninView}
      options={{ title: "Sign In" }}
    />
  </LoginStack.Navigator>
);

// Message Screen has a child Settings page
const MessageStack = createStackNavigator();
const MessageStackScreen = () => (
  <MessageStack.Navigator>
    <MessageStack.Screen
      name="Messages"
      component={MessageView}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontSize: 24,
            }}
          >
            Messages
          </Text>
        ),
        headerLeft: () => (
          <Icon
            name="menu"
            style={{marginLeft: 3}}
            size={40}
            onPress={() => {
              Keyboard.dismiss();
              navigation.toggleDrawer()
              }
            }
          />
        ),
        headerRight: () => (
          <Icon
            name="user"
            style={{marginRight: 3}}
            size={40}
            onPress={() => {
              Keyboard.dismiss();
              navigation.push("Settings", { name: "Settings" })
              }
            }
          />
        ),
      })}
    />
    <MessageStack.Screen
      name="Settings"
      component={SettingsView}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </MessageStack.Navigator>
);

// Sidemenu contains the message screen stack component
const SideMenuStack = createDrawerNavigator();
const SideMenuScreen = () => (
  <SideMenuStack.Navigator
    drawerContent={props => <ChatSelectionView {...props} />}
  >
    <SideMenuStack.Screen
      name="MessageAndSettings"
      component={MessageStackScreen}
    />
  </SideMenuStack.Navigator>
);

/*
  Parent Stack - entry point to either login or message view
*/

const RootStack = createStackNavigator();
const RootStackScreen = (props) => (
  <RootStack.Navigator
    screenOptions={{
      headerMode: 'none',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: 'tomato' },
    }}>
    {props.isSignedIn ? (
      <RootStack.Screen
        name="Home"
        component={SideMenuScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Login"
        component={LoginStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

// Getters: props.user.password OR props.user.username
function mapStateToProps(state) {
  return {
    isSignedIn: state.isSignedIn,
  };
}

const ReduxConnectedRootStack = connect(mapStateToProps)(RootStackScreen);

/*
  Default - renders all the stacks
*/

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ReduxConnectedRootStack />
      </NavigationContainer>
    </Provider>
  );
};
