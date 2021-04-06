<template>
  <div>
    <time-slot-picker
      :get-options="options"
      :time-occupied="timeOccupied"
      :time-range="timeRange"
      :date.sync="datePicker"
      :start.sync="startPicker"
      :end.sync="endPicker"
    ></time-slot-picker>
  </div>
</template>

<script>
import options from "../json/options";
export default {
  name: "time-slot-picker-page",
  data() {
    return {
      datePicker: "",
      startPicker: "",
      endPicker: "",
      options,
      timeRange: ["08:30:00 - 18:00:00"],
      timeOccupied: [
        ["09:00", "10:00"],
        ["13:00", "14:30"],
      ],
    };
  },
};
</script>

<style>
</style>