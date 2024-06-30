//import liraries
import React, { Component, useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableHighlight,
  PanResponder,
  View,
} from "react-native";
import Util from "../../common/utils";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";

// create a component
const MyComponent = () => {
  const [data, setData] = useState([
    {
      key: 0,
      title: "A stopwatch",
      isFA: false,
      icon: "stopwatch",
      size: 48,
      color: "#ff856c",
      hideNav: false,
    },
    {
      key: 1,
      title: "A weather app",
      isFA: false,
      icon: "partly-sunny",
      size: 60,
      color: "#90bdc1",
      hideNav: true,
    },
    {
      key: 2,
      title: "twitter",
      isFA: false,
      icon: "twitter",
      size: 50,
      color: "#2aa2ef",
      hideNav: true,
    },
    {
      key: 3,
      title: "cocoapods",
      isFA: true,
      icon: "contao",
      size: 50,
      color: "#FF9A05",
      hideNav: false,
    },
    {
      key: 4,
      title: "find my location",
      isFA: false,
      icon: "pin",
      size: 50,
      color: "#00D204",
      hideNav: false,
    },
    {
      key: 5,
      title: "Spotify",
      isFA: true,
      icon: "spotify",
      size: 50,
      color: "#777",
      hideNav: true,
    },
    {
      key: 6,
      title: "Moveable Circle",
      isFA: false,
      icon: "baseball",
      size: 50,
      color: "#5e2a06",
      hideNav: true,
    },
    {
      key: 7,
      title: "Swipe Left Menu",
      isFA: true,
      icon: "google",
      size: 50,
      color: "#4285f4",
      hideNav: true,
    },
    {
      key: 8,
      title: "Twitter Parallax View",
      isFA: true,
      icon: "twitter-square",
      size: 50,
      color: "#2aa2ef",
      hideNav: true,
    },
    {
      key: 9,
      title: "Tumblr Menu",
      isFA: false,
      icon: "logo-tumblr",
      size: 50,
      color: "#37465c",
      hideNav: true,
    },
    {
      key: 10,
      title: "OpenGL",
      isFA: false,
      icon: "contrast",
      size: 50,
      color: "#2F3600",
      hideNav: false,
    },
    {
      key: 11,
      title: "charts",
      isFA: false,
      icon: "stats",
      size: 50,
      color: "#fd8f9d",
      hideNav: false,
    },
    {
      key: 12,
      title: "tweet",
      isFA: false,
      icon: "md-chatboxes",
      size: 50,
      color: "#83709d",
      hideNav: true,
    },
    {
      key: 13,
      title: "tinder",
      isFA: true,
      icon: "fire",
      size: 50,
      color: "#ff6b6b",
      hideNav: true,
    },
    {
      key: 14,
      title: "Time picker",
      isFA: false,
      icon: "calendar-outline",
      size: 50,
      color: "#ec240e",
      hideNav: false,
    },
  ]);
  const [selectedIndex, setSelected] = useState(0);
  const boxRefs = useRef([]);
  const containerView = useRef(null);

  const animations = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.linear,
      springDamping: 0.7,
    },
  };
  const width = Math.floor(Util.size.width / 3);
  const moveObj = useRef({
    topIndex: 0,
    leftIndex: 0,
    index: 0,
  });
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx !== 0 || gestureState.dx !== 0;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { pageX, pageY } = evt.nativeEvent;
      let topIndex = Math.floor((pageY - 60) / width);
      let leftIndex = Math.floor(pageX / width);
      let index = topIndex * 3 + leftIndex;
      let startX = pageX
      let startY = pageY

      setSelected(index);
      moveObj.current = {
        topIndex,
        leftIndex,
        index,
        finalTopIndex: topIndex,
        finalLeftIndex: leftIndex,
        startX,
        startY
      };
      let box = boxRefs.current[index];
      box?.setNativeProps({
        style: {
          opacity: 0.7,
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowOffset: {
            height: 2,
            width: 2,
          },
        },
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      const { pageX, pageY } = evt.nativeEvent;
      let left = moveObj.current.leftIndex * width + (pageX -  moveObj.current.startX );
      let top = moveObj.current.topIndex * width +(pageY -  moveObj.current.startY );
      let box = boxRefs.current[moveObj.current.index];
      box?.setNativeProps({
        style: { top: top, left: left },
      });
      _endMove(evt, gestureState, top, left);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => _release(evt, gestureState),
    onPanResponderTerminate: (evt, gestureState) => _release(evt, gestureState),
    onShouldBlockNativeResponder: (event, gestureState) => true,
  });
  function _endMove(evt, gestureState, top, left) {
    let finalTopIndex = Math.floor(top / width + 0.5) ;
    let finalLeftIndex = Math.floor(left / width + 0.5);
    let index = moveObj.current.index;
    let finalIndex = finalTopIndex * 3 + finalLeftIndex;
    if (
      -1 < finalTopIndex &&
      finalTopIndex < 5 &&
      -1 < finalLeftIndex &&
      finalLeftIndex < 3
    ) {
      let movedBox = data[index];
      finalIndex = finalTopIndex * 3 + finalLeftIndex
      data.splice(index, 1);
      data.splice(finalIndex, 0, movedBox);
      setData([...data]);
      if (finalIndex != index) {
        index = finalIndex;
        setSelected(finalIndex);
      }
      LayoutAnimation.configureNext(animations);
    } else {
      let top = moveObj.current.topIndex * width;
      let left = moveObj.current.leftIndex * width;
      let box = boxRefs.current[index];
      LayoutAnimation.configureNext(animations);
    }
    moveObj.current = {
      ...moveObj.current,
      index,
      finalLeftIndex,
      finalTopIndex,
      finalIndex,
    };
  }
  function _release(evt, gestureState) {
    const {
      topIndex,
      leftIndex,
      index,
      finalLeftIndex,
      finalTopIndex,
      finalIndex,
    } = moveObj.current;
    const shadowStyle = {
      opacity: 1,
      shadowColor: "#000",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    };
    if (
      -1 < finalTopIndex &&
      finalTopIndex < 5 &&
      -1 < finalLeftIndex &&
      finalLeftIndex < 3
    ) {
      let box = boxRefs.current[finalIndex];
      let top = finalTopIndex * width;
      let left = finalLeftIndex * width;
      
      box.setNativeProps({
        style: {top,left, ...shadowStyle },
      });
      LayoutAnimation.configureNext(animations);
    } else {
      let box = boxRefs.current[index];
      let top = topIndex * width;
      let left = leftIndex * width;
      box.setNativeProps({
        style: { top,left,...shadowStyle },
      });
      LayoutAnimation.configureNext(animations);
    }
  }
  const boxes = data.map((elem, index) => {
    let top = Math.floor(index / 3) * Math.floor(Util.size.width / 3);
    let left = (index % 3) * Math.floor(Util.size.width / 3);
    return (
      <View
        key={elem.key}
        style={[styles.touchBox, { top, left }]}
        underlayColor="#eee"
        {..._panResponder.panHandlers}
        ref={(el) => (boxRefs.current[index] = el)}
      >
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Day{elem.key}</Text>
          {/* {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
            <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>} */}
          <Icon
            size={elem.size}
            name="stopwatch"
            style={[styles.boxIcon, { color: elem.color }]}
          ></Icon>
        </View>
      </View>
    );
  });
  let selectedItem = boxes[selectedIndex];
  boxes.splice(selectedIndex, 1);
  boxes.push(selectedItem);

  return (
    <View style={styles.container} ref={containerView}>
      {boxes}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "warp",
    backgroundColor: "pink",
    position: "relative",
  },
  itemWrapper: {
    backgroundColor: "#f3f3f3",
  },
  touchBox: {
    width: Util.size.width / 3,
    height: Util.size.width / 3,
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    top: 0,
    borderWidth: Util.pixel,
    // borderColor:"#ccc",
    borderColor: "red",
  },
  touchBoxContainer: {
    width: Util.size.width,
    marginTop: 30,
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Util.size.width / 3,
    height: Util.size.width / 3,
  },
  boxIcon: {
    position: "relative",
    top: -10,
  },
  boxText: {
    position: "absolute",
    bottom: 15,
    width: Util.size.width / 3,
    textAlign: "center",
    left: 0,
    backgroundColor: "transparent",
  },
});

//make this component available to the app
export default MyComponent;
