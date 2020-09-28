import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MessageView from "./views/MessageView";
import LoginScreen from "./views/LoginView";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MessageView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
