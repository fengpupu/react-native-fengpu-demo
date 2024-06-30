import React, { useState, useRef, useEffect } from "react";
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

const Sortable = () => {
  const _width = Util.size.width / 3;
  const [selected, setSelected] = useState(14); // last item selected by default
  const [days, setDays] = useState([
    {
      key: 0,
      title: "A stopwatch",
      isFA: false,
      icon: "ios-stopwatch",
      size: 48,
      color: "#ff856c",
      hideNav: false,
    },
    {
      key: 1,
      title: "A weather app",
      isFA: false,
      icon: "ios-partly-sunny",
      size: 60,
      color: "#90bdc1",
      hideNav: true,
    },
    {
      key: 2,
      title: "twitter",
      isFA: false,
      icon: "logo-twitter",
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
      icon: "md-pin",
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
      icon: "ios-baseball",
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
      icon: "md-contrast",
      size: 50,
      color: "#2F3600",
      hideNav: false,
    },
    {
      key: 11,
      title: "charts",
      isFA: false,
      icon: "ios-stats",
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
      icon: "ios-calendar-outline",
      size: 50,
      color: "#ec240e",
      hideNav: false,
    },
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx !== 0 || gestureState.dy !== 0;
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        const topIndex = Math.floor((pageY - 30) / _width);
        const leftIndex = Math.floor(pageX / _width);
        const index = topIndex * 3 + leftIndex;
        const prev_left = _width * leftIndex;
        const prev_top = _width * topIndex;
        setSelected(index);
        // Setup initial style for the draggable box
      },
      onPanResponderMove: (evt, gestureState) => {
        const left = prev_left + gestureState.dx;
        const top = prev_top + gestureState.dy;
        // Update position of the box
      },
      onPanResponderRelease: () => {
        // Implement release behavior: reorder items or snap back
      },
    })
  ).current;

  useEffect(() => {
    // This replaces componentWillMount logic
  }, []); // Empty array ensures it runs only once on mount

  const renderBoxes = () => {
    return days.map((elem, index) => (
      <View
        ref={"box" + index}
        {...panResponder.panHandlers}
        key={elem.key}
        style={[styles.touchBox]}
      >
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Day {index + 1}</Text>
        </View>
      </View>
    ));
  };

  return <View style={styles.touchBoxContainer}>{renderBoxes()}</View>;
};

export default Sortable;

const styles = StyleSheet.create({
  // Styles remain the same
});
