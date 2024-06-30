//import liraries
import React, { Component } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import Utils from "../../common/utils";
const MyComponent = ({
  name,
  pathName,
  handlePress,
  isFA,
  icon,
  color = "red",
  bgColor = "white",
}) => {
  return (
    <Pressable
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={handlePress}
    >
      {isFA ? (
        <IconFA name={icon} size={"60%"} color={color}></IconFA>
      ) : (
        <Icon name={icon} size={"60%"} color={color}></Icon>
      )}
      <Text style={Utils.styles.mdText}>{name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: Utils.size.width / 2 - 30,
    height: Utils.size.width / 2 - 30,
    shadowColor: "black",
    padding:20
  },
});

export default MyComponent;
