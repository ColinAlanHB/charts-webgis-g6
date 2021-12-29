import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import router from "./router";
import * as echarts from "echarts";
import lightTheme from "./common/chartsTheme/light.js";
import darkTheme from "./common/chartsTheme/dark.js";

Vue.use(Antd);

Vue.config.productionTip = false

const dark = darkTheme;
const light = lightTheme;
echarts.registerTheme("lightTheme", light);
echarts.registerTheme("darkTheme", dark);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
