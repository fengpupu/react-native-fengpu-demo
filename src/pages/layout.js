//import liraries
import React, { Component, useMemo, useLayoutEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Time from "./time/index";
import BallMove from "./ballMove/index";
import Weather from "./weather/index";
import VirtualList from "./virtualList/index";
import InputView from "./InputView/index";
import Test from "./Test/index";
import SortCard from "./sortCard/index";
// create a component
const MyComponent = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, [route]);
  const Component = useMemo(() => {
    switch (route.params.pathName) {
      case "test":
        return Test;
      case "time":
        return Time;
      case "ballMove":
        return BallMove;
      case "weather":
        return Weather;
      case "virtualList":
        return VirtualList;
      case "inputView":
        return InputView;
      case "sortCard":
        return SortCard;
      default:
        return View;
    }
  }, [route]);
  return <Component styles={styles.navigatorView}></Component>;
};
const styles = StyleSheet.create({
  navigatorView: {
    flex: 1,
  },
});

export default MyComponent;
