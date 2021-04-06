# 时间和分钟选择的 vue 功能

## 技术栈

vue.js+element-ui

## 实现功能

- 选择一天中的部分时间,有的时间点不能选择,根据获取到的不能选择的数据来设置可以选择的时间区域
- 选择日期后,判断可选的开始时间,只能选不在不可选中的并且只能是当前时间以后的
- 选择开始时间后,判断结束时间,只能是开始时间所在的可选时间段内的时间

## html 文件夹

### time-range.html

- 选择日期，选择可选范围内的开始时间和结束时间（使用 select 实现）
- 可选分钟只能是 '00' 和 '30',作为 option 选项，从 getOptions 中设置（利用 element-ui 的 select 的 disabled 功能来实现）
- 参数：
  getOptions：传递到组件中的显示的时间节点，设置是否可选
  timeOccupied：传递到组件中的已经占用的时间
- 获取值
  date：选中的日期
  start：选中的开始时间，时分
  end：选中的结束时间，时分

### time-range-picker.html

- 使用 time-picker 实现
- 可选一天里的所有小时和分钟
- 利用 element-ui 的 time-picker 的 picker-options 的 selectableRange 来设置可以使用的时间
- 参数
  timeRange：可选的时间范围
  timeOccupied：传递到组件中的已经占用的时间
- 获取值
  date：选中的日期
  start：选中的开始时间，时分
  end：选中的结束时间，时分

### 参数

- timeOccupied 获取到的不可选择时间区域是['09:00', '10:00'], ['13:00', '14:30']

## demo 文件夹

- 是一个组件注册的 html 例子

## dist

- 打包后的组件文件

## vue-demo

- vue 调用组件
