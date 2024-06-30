import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';

 const ExampleComponent = () => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(30);


  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHeight(height === 100 ? 200 : 100);
    setWidth(width === 30 ? 100 : 30);

  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: '100%', height: height, width:width,backgroundColor: 'red'}}>
        <Text>Click Me to Animate</Text>
      </View>
    </TouchableOpacity>
  );
}
export default ExampleComponent