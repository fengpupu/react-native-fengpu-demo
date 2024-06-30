	1.	WatchFace组件：显示当前累积的总时间(﻿totalTime)和一个小段时间(﻿sectionTime)。这两个时间都是从父组件接收的props。
	2.	WatchRecord组件：利用﻿FlatList组件展示计时中的每一个分段时间记录(﻿record)。每个记录显示了分段时间和标题。
	3.	WatchControl组件：
	▪	管理计时器的开始（启动/停止）、计次（记录时间间隔）和复位操作。
	▪	使用内部状态﻿state来跟踪计时器是否正在运行(﻿watchOn)，以及开始和停止按钮的文本和颜色等。
	▪	点击开始/停止按钮(﻿btnStart)和计次/复位按钮(﻿btnStop)时，会根据当前状态调用相应的方法（如﻿startWatch, ﻿stopWatch, ﻿addRecord, ﻿clearRecord），这些方法都作为props传入。
	4.	MyComponent：
	▪	是使用这些子组件的容器组件，它维护了计时器的核心状态，如当前时间、是否停止、累积时间等。
	▪	使用﻿useEffect来处理定时器逻辑，确保当计时器启动时更新时间。
	▪	处理时间的核心逻辑在﻿getTime方法中，该方法计算并更新了显示的总时间和分段时间。
	▪	提供了开始、停止、记录分段时间和清除记录的方法。