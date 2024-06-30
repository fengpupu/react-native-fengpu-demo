//import liraries
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Util from "../../common/utils";
// create a component
const WatchFace = ({ totalTime, sectionTime }) => {
  return (
    <View style={styles.watchFaceContainer}>
      <Text style={styles.sectionTime}>{sectionTime}</Text>
      <Text style={styles.totalTime}>{totalTime}</Text>
    </View>
  );
};
const WatchRecord = ({ record }) => {
  return (
    <View style={styles.recordList}>
      <FlatList
        data={record}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
                        <Text style={styles.recordItemTime}>{item.time+''}</Text>
            <Text style={styles.recordItemTitle}>{item.title}</Text>

          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const WatchControl = ({ startWatch, stopWatch, addRecord, clearRecord }) => {
  const [state, setState] = useState({
    watchOn: false,
    startBtnText: "启动",
    startBtnColor: "#60B644",
    stopBtnText: "计次",
    underlayColor: "#fff",
  });

  function _startWatch() {
    if (!state.watchOn) {
      startWatch();
      setState({
        startBtnText: "停止",
        startBtnColor: "#ff0044",
        stopBtnText: "计次",
        underlayColor: "#eee",
        watchOn: true,
      });
    } else {
      stopWatch();
      setState({
        startBtnText: "启动",
        startBtnColor: "#60B644",
        stopBtnText: "复位",
        underlayColor: "#eee",
        watchOn: false,
      });
    }
  }
  function _addRecord() {
    if (state.watchOn) {
      addRecord();
    } else {
      clearRecord();
      setState({
        ...state,
        stopBtnText: "计次",
      });
    }
  }
  return (
    <View style={styles.watchControlContainer}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Pressable
          style={styles.btnStop}
          underlayColor={state.underlayColor}
          onPress={_addRecord}
        >
          <Text style={styles.btnStopText}>{state.stopBtnText}</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Pressable
          style={styles.btnStart}
          underlayColor="#eee"
          onPress={_startWatch}
        >
          <Text
            style={[
              styles.btnStartText,
              {
                color: state.startBtnColor,
              },
            ]}
          >
            {state.startBtnText}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const MyComponent = () => {
  const [totalTime, setTotalTime] = useState("00:00.00");
  const [sectionTime, setSectionTime] = useState("00:00.00");
  //watch相关状态
  const [watchState, setWatchState] = useState({
    stopWatch: true,
    resetWatch: true,
    intialTime: 0,
    currentTime: 0,
    recordTime: 0,
    timeAccumulation: 0,
  });
  //record
  const [record, setRecord] = useState([]);
  useEffect(() => {
    let time = null;
    if (!watchState.stopWatch) {
      getTime();
      time = setTimeout(() => {
        setWatchState({
          ...watchState,
          currentTime: new Date().getTime(),
        });
      }, 10);
    }
    return () => clearTimeout(time);
  }, [watchState]);
  function getTime() {
    let milSecond,
      second,
      minute,
      countingTime,
      secmilSecond,
      secsecond,
      secminute,
      seccountingTime;
    countingTime =
      Number(watchState.timeAccumulation) +
      Number(watchState.currentTime) -
      Number(watchState.initialTime);
    minute = Math.floor(countingTime / (60 * 1000));
    second = Math.floor((countingTime - 6000 * minute) / 1000);
    milSecond = Math.floor((countingTime % 1000) / 10);
    seccountingTime = countingTime - watchState.recordTime;
    secminute = Math.floor(seccountingTime / (60 * 1000));
    secsecond = Math.floor((seccountingTime - 6000 * secminute) / 1000);
    secmilSecond = Math.floor((seccountingTime % 1000) / 10);
    setTotalTime(
      (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second) +
        "." +
        (milSecond < 10 ? "0" + milSecond : milSecond)
    );
    setSectionTime(
      (secminute < 10 ? "0" + secminute : secminute) +
        ":" +
        (secsecond < 10 ? "0" + secsecond : secsecond) +
        "." +
        (secmilSecond < 10 ? "0" + secmilSecond : secmilSecond)
    );
  }
  function _startWatch() {
    // 如果是重新开始
    if (watchState.resetWatch) {
      setWatchState({
        ...watchState,
        stopWatch: false,
        resetWatch: false,
        timeAccumulation: 0,
        initialTime: new Date().getTime(),
        currentTime: new Date().getTime(),
      });
    } else {
      setWatchState({
        ...watchState,
        stopWatch: false,
        currentTime: new Date().getTime(),
        initialTime: new Date().getTime(),
        // timeAccumulation:Number(watchState.timeAccumulation) +
        // Number(watchState.currentTime) -
        // Number(watchState.initialTime)
      });
    }
  }
  function _addRecord() {
    setWatchState({
      ...watchState,
      recordTime:
        Number(watchState.timeAccumulation) +
        Number(watchState.currentTime) -
        Number(watchState.initialTime),
    });
    setRecord([
      {
        title: "计次" + (record.length + 1),
        time: sectionTime,
        id: record.length + 1,
      },
      ...record,
    ]);
  }
  function _clearRecord() {
    console.log("clear");
    setSectionTime("00:00:00");
    setTotalTime("00:00:00");
    setWatchState({
      stopWatch: true,
      resetWatch: true,
      intialTime: 0,
      currentTime: 0,
      recordTime: 0,
      timeAccumulation: 0,
    });
  }
  function _stopWatch() {
    setWatchState({
      ...watchState,
      stopWatch: true,
      timeAccumulation:
        Number(watchState.timeAccumulation) +
        Number(watchState.currentTime) -
        Number(watchState.initialTime),
    });
  }
  return (
    <View style={styles.watchContainer}>
      <WatchFace totalTime={totalTime} sectionTime={sectionTime}></WatchFace>
      <WatchControl
        addRecord={_addRecord}
        clearRecord={_clearRecord}
        startWatch={_startWatch}
        stopWatch={_stopWatch}
      ></WatchControl>
      <WatchRecord record={record}></WatchRecord>
    </View>
  );
};

const styles = StyleSheet.create({
  watchContainer: {
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    marginTop: 0,
    height: "100%",
  },
  watchFaceContainer: {
    width: Util.size.width,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 170,
  },
  sectionTime: {
    fontSize: 20,
    fontWeight: "100",
    paddingRight: 30,
    color: "#555",
    position: "absolute",
    left: Util.size.width - 140,
    top: 30,
  },
  totalTime: {
    fontSize: Util.size.width === 375 ? 70 : 60,
    fontWeight: "400",
    color: "#222",
    paddingLeft: 20,
  },
  watchControlContainer: {
    width: Util.size.width,
    height: 100,
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 0,
  },
  btnStart: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStop: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStartText: {
    fontSize: 14,
    backgroundColor: "transparent",
  },
  btnStopText: {
    fontSize: 14,
    backgroundColor: "transparent",
    color: "#555",
  },
  recordList: {
    width: Util.size.width,
    padding: 20,
    flex: 1,
  },
  recordItem: {
    height: 40,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#bbb",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-between'
  },
  recordItemTitle: {
    backgroundColor: "transparent",
    flex: 1,
    paddingLeft: 20,
    color: "#777",
    width:'50%',
    textAlign: "right",

  },
  recordItemTime: {
    backgroundColor: "transparent",
    textAlign: "left",
    paddingRight: 20,
    color: "#222",
  },
});

export default MyComponent;
