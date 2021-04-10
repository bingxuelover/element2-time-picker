import Vue from "vue";
import "./utils/element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { TimeSlotPicker, TimePointPicker } from "../../dist/element-ui.cjs";
import App from "./App.vue";

Vue.use(TimeSlotPicker);
Vue.use(TimePointPicker);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
