<template>
  <div id="app">
    <h2>time-slot-picker</h2>
    <TimeSlotPickerPage />
    <h2>time-point-range</h2>
    <TimePointPickerPage />
  </div>
</template>

<script>
import TimeSlotPickerPage from "./components/TimeSlotPickerPage.vue";
import TimePointPickerPage from "./components/TimePointPickerPage.vue";

export default {
  name: "App",
  components: {
    TimeSlotPickerPage,
    TimePointPickerPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
