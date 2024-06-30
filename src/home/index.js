//import liraries
import React, { Component } from "react";
import { ScrollView, Text, StyleSheet,View } from "react-native";
import Card from "./part/card";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Utils from "../common/utils";
let demoList=[
  // {
  //   name: "test",
  //   pathName: "test",
  //   id: 0,
  //   isFA: false,
  //   icon: "stopwatch",
  //   color: "#ff856c",
  // },
  {
    name: "计时器",
    pathName: "time",
    id: 1,
    isFA: false,
    icon: "stopwatch",
    color: "#ff856c",
  },
  {
    name: "小球移动",
    pathName: "ballMove",
    id: 2,
    isFA: false,
    icon: "baseball",
    color: "#5e2a06",
  },
  {
    name: "天气",
    pathName: "weather",
    id: 3,
    isFA: false,
    icon: "partly-sunny",
    color: "#90bdc1",
  },
  {
    name: "虚拟列表",
    pathName: "virtualList",
    id: 4,
    isFA: false,
    icon: "newspaper",
    color: "#4173ed",
  },
  {
    name: "排序",
    pathName: "sortCard",
    id: 6,
    isFA: true,
    icon: "sort-amount-asc",
    color: "#6c56d4",
  },
  // {
  //   name: "编辑器",
  //   pathName: "inputView",
  //   id: 5,
  //   isFA: false,
  //   icon: "partly-sunny",
  //   color: "#90bdc1",
  // },
  // {
  //   name: "天气",
  //   pathName: "weather",
  //   id: 6,
  //   isFA: false,
  //   icon: "partly-sunny",
  //   color: "#90bdc1",
  // },
]
const Stack = createNativeStackNavigator();
const MyComponent = ({navigation}) => {
  function handlePress(item){
    navigation.navigate('Layout',item)
  }
  return (
    <ScrollView contentContainerStyle={[styles.container,Utils.styles.baseText]}>
      <View style={styles.headerView}></View>
      {demoList.map((item) => (
        <Card key={item.id} {...item} navigation={navigation} handlePress={()=>handlePress(item)}></Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 0,
    width:'100%'
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    paddingLeft:20,
    paddingRight:20,

  },
});

export default MyComponent;
