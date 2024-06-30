//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Animated,{ useSharedValue, useAnimatedStyle} from "react-native-reanimated";
import { Gesture, GestureDetector,GestureHandlerRootView } from "react-native-gesture-handler";
import Utils from "../../common/utils";
import Icon from "react-native-vector-icons/Ionicons";

// create a component
const MyComponent = () => {
  const isPress = useSharedValue(false);
  const offset = useSharedValue({ x: Utils.size.width/2 - 40 , y: Utils.size.height/2 - 80  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
      backgroundColor: isPress.value ? "pink" : "white",
    };
  });
  const dragGesture = Gesture.Pan()
    .onBegin((e) => {
      isPress.value = true;
    })
    .onChange((e) => {
      offset.value = {
        x: offset.value.x + e.changeX,
        y: offset.value.y + e.changeY,
      };
    })
    .onFinalize(() => {
      isPress.value = false;
    });
  return (
    <GestureHandlerRootView>
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[styles.ball, animatedStyles]} >
        <Icon size={80} name='baseball' color="#5e2a06"></Icon>
      </Animated.View>
    </GestureDetector>
    </GestureHandlerRootView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  ball:{
    height:80,
    width:80,
    borderRadius:80
  }
});

//make this component available to the app
export default MyComponent;
