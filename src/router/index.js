//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../home/index";
import Layout from "../pages/layout";

const Stack = createNativeStackNavigator();

// create a component
const MyComponent = () => {
  return (
    // 首先，所有的导航都要被包裹在NavigationContainer里面
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title:'react native demos',
              }}
            />
          <Stack.Screen
              name="Layout"
              component={Layout}
              options={{
                title:'Layout',
                headerBackTitle:'home',
              }}
            />
          </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  navigatorView: {
    flex: 1,
  },
});

export default MyComponent;
