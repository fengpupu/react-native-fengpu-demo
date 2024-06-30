import { PixelRatio, Dimensions, StyleSheet } from "react-native";
const Utils = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  styles: StyleSheet.create({
    mdText: {
      fontSize: 18,
      fontWeight: "blod",
    },
    baseText: {
      fontSize: 14,
    },
    smallText: {
      fontSize: 12,
    },
  }),
};

export default Utils;
