组件功能描述
* 动画状态管理：
	* 使用﻿useSharedValue来存储动态变化的值（如是否被按下﻿isPress和偏移量﻿offset）。这些值会随着手势操作而改变，且对性能的影响最小化。
* 动画样式：
	* ﻿useAnimatedStyle用于创建依赖于﻿useSharedValue中值的动态样式。在这里，根据偏移量改变﻿transform属性（平移）和根据是否被按下改变背景色。
* 手势识别：
  * 使用﻿Gesture.Pan()创建一个拖拽手势。手势有三个主要的响应阶段：开始(﻿onBegin)、改变(﻿onChange)、结束(﻿onFinalize)。在开始阶段，设置﻿isPress为﻿true表示开始拖动，改变阶段通过计算变化的X和Y对偏移量﻿offset进行更新，结束阶段将﻿isPress设置为﻿false。
* 界面布局：
	* ﻿GestureHandlerRootView和﻿GestureDetector用于包裹拖动的﻿Animated.View，使其能正确处理手势。
	* ﻿Animated.View则通过应用﻿animatedStyles来表现动画效果，并包含一个﻿Icon组件显示图标。