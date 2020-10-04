import React from "react";
import { Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { store } from "./store/index";

import SigninView from "./views/LoginView";
import SettingsView from "./views/SettingsView";
import MessageView from "./views/MessageView";
import ChatSelection from "./views/ChatSelection";

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
          <Button title="Side menu" onPress={() => navigation.toggleDrawer()} />
        ),
        headerRight: () => (
          <Button
            title="Settings"
            onPress={() => navigation.push("Settings", { name: "Settings" })}
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
  <SideMenuStack.Navigator drawerContent={ChatSelection}>
    <SideMenuStack.Screen
      name="MessageAndSettings"
      component={MessageStackScreen}
    />
  </SideMenuStack.Navigator>
);

/*
  Parent Stack - entry point to either login or message view
*/

// toggle to either see login page or see messages page
const RENDER_LOGIN_PAGE = true;

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    {RENDER_LOGIN_PAGE ? (
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

/*
  Default - renders all the stacks
*/

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};
