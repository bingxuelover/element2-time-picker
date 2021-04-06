import TimeSlotPicker from "./components/TimeSlotPicker";
import TimePointPicker from "./components/TimePointPicker";

const components = [TimeSlotPicker, TimePointPicker];
const install = app => {
  if (install.installed) return;
  components.forEach(component => {
    app.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const elementUI = {
  install,
};

export { TimePointPicker, TimeSlotPicker };

export default elementUI;
