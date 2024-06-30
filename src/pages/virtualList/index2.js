//import liraries
import React, { Component, useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// create a component
const MyComponent = () => {
  const LOADING_HEIGHT = 50;
  const [list, setList] = useState([]);
  const pageNum = useRef(0);
  const time = useRef(null);

  const refreshY = useSharedValue(-LOADING_HEIGHT);
  const scrollY = useSharedValue(10);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => 1, // assuming only one type of item
        (type, dim) => {
          dim.width = windowWidth;
          dim.height = 70;
        }
      ),
    []
  );
  useEffect(() => {
    //第一次加载
    setLoading(true);
    addList();
  }, []);
  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(list));
  }, [list]);
  const rowRenderer = (type, data, index) => {
    return (
      <View
        style={{
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
          margin: 5,
        }}
      >
        <Text>{data.title}</Text>
      </View>
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: refreshY.value }],
    };
  });

  const wrapperHeight = windowHeight + LOADING_HEIGHT;

  const scrollGesture = Gesture.Native();
  const panGesture = Gesture.Pan()
    .onChange((e) => {
      if (scrollY.value === 0 || refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value = Math.max(-LOADING_HEIGHT, refreshY.value + e.changeY);
      }
      if (refreshY.value >= LOADING_HEIGHT / 2) {
        //这里是在UI线程中执行,要转回JS线程
        runOnJS(setRefresh)(true);
      }
    })
    .onEnd((e) => {
      if (refresh) {
        runOnJS(addList)();
        runOnJS(setList)([]);
        runOnJS(setFinish)(false);
        refreshY.value = withSpring(LOADING_HEIGHT, {
          stiffness: 300,
          overshootClamping: true,
        });
      } else if (refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value = withSpring(-LOADING_HEIGHT, {
          stiffness: 300,
          overshootClamping: true,
        });
        runOnJS(setRefresh)(false);
      }
    });

  function addList(n = 20) {
    if (time.current) {
      return;
    }
    if (list.length > 50 && !refresh) {
      setFinish(true);
      refreshY.value = withSpring(-LOADING_HEIGHT, {
        stiffness: 300,
        overshootClamping: true,
      });
      return list;
    }
    if (refresh) {
      pageNum.current = 0;
      setFinish(false);
    }
    let newList = [];
    for (let i = 1; i <= n; i++) {
      newList.push({
        title: `这是第${pageNum.current * n + i}条数据`,
      });
    }
    time.current = setTimeout(() => {
      refresh ? setList(newList) : setList([...list, ...newList]);
      pageNum.current = pageNum.current + 1;
      refreshY.value = withSpring(-LOADING_HEIGHT, {
        stiffness: 300,
        overshootClamping: true,
      });
      setRefresh(false);
      setLoading(false);
      time.current = null;
    }, 1000);
  }
  const scrollListHandle = (e, x, y) => {
    console.log('--- **** ----- **** scroll')
    scrollY.value = y;
  };
  const loadDataHandle = () => {
    setLoading(true);
    addList();
  };
  return (
    <Animated.View style={[{ height: wrapperHeight }, animatedStyle]}>
      <View
        style={{
          height: LOADING_HEIGHT,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        {refresh ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{ color: "#b8b8b8" }}>上拉加载</Text>
        )}
      </View>

      <GestureHandlerRootView>
        <GestureDetector
          gesture={Gesture.Simultaneous(scrollGesture, panGesture)}
        >
          <View
            style={{ flex: 1 }}
            onMoveShouldSetResponder={() => {
              console.log("start ----- out");
              return true;
            }}
            onResponderGrant={(evt) => {
              console.log("grant ******** out");
            }}
            onResponderReject={() => {
              console.log("out end ---------------------");
            }}
            onResponderRelease={()=>{
              console.log("fatcher  release ---------------------");

            }}
            onResponderMove={() => {
              console.log("fatcher moving-----------");
            }}
            onResponderRelease={()=>{
              console.log("upppp---------fatcher  release ---------------------");
              // debugger
            }}
          >
            <View
              style={{ flex: 1 }}
              onMoveShouldSetResponder={() => {
                console.log("start ----- in");
                return true;
              }}
              onResponderGrant={(evt) => {
              console.log("grant ******** in");

              }}
              onResponderTerminationRequest={() => {
                console.log("---- onther want to have right ---");
                return true;
              }}
              onResponderMove={async () => {
                console.log("child moving-----------");
                for(let i = 0; i< 10;i++){
                  console.log('i'+i) 
                }
                console.log("child moving-----------end");
              }}
              onResponderRelease={()=>{
                console.log("upppp---------child  release ---------------------");
                // debugger
              }}
              // onScroll={scrollListHandle}

            >
              <RecyclerListView
                bounces={false}
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
                onScroll={scrollListHandle}
                contentContainerStyle={{ paddingBottom: 100 }}
                onEndReached={loadDataHandle}
                renderFooter={() => (
                  <View
                    style={{ padding: 10, alignItems: "center", height: 100 }}
                  >
                    {finish ? (
                      <Text>没有更多了</Text>
                    ) : refresh ? (
                      <Text>加载中... </Text>
                    ) : (
                      <ActivityIndicator size="small" />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Animated.View>
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
  listContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
});

//make this component available to the app
export default MyComponent;
