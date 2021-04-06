import TimePointPicker from "./TimePointPicker.vue";

TimePointPicker.install = function(app) {
  app.component(TimePointPicker.name, TimePointPicker);
};

export default TimePointPicker;
