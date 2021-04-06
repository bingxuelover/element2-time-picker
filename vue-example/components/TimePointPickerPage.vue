<template>
  <div>
    <time-point-picker
      :time-occupied="timeOccupied"
      :time-range="timeRange"
      :date.sync="datePicker"
      :start.sync="startPicker"
      :end.sync="endPicker"
    ></time-point-picker>
  </div>
</template>

<script>
export default {
  name: "time-point-picker-page",
  data() {
    return {
      datePicker: "",
      startPicker: "",
      endPicker: "",
      timeRange: ["08:30:00 - 18:00:00"],
      timeOccupied: [],
    };
  },
};
</script>

<style>
</style>