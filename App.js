import { SafeAreaView,View } from "react-native";
import Router from "./src/router/index";

export default function App() {
  return (
    <View style={{flex:1}}> 
      <Router></Router>
    </View> 
  );
}
