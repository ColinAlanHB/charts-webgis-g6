<template>
  <div class="cockpit-panel" ref="chart"></div>
</template>

<script>
  import * as echarts from "echarts";
  import panelOptions from "./panelOptions.js";
  import echartResize from "@/mixins/echartResize";
  export default {
    name: "zh-cockpit-panel",
    components: {},
    mixins: [echartResize],
    props: {
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      themeType: {
        type: String,
        default: "light",
      },
    },
    data() {
      return {
        panelOptions: null,
        chart: null,
      };
    },
    computed: {},
    watch: {
      data: {
        deep: true,
        handler(val) {
          if (val) {
            this.initData();
            this.initPanel();
          }
        },
      },
      themeType() {
        this.initData();
        this.initPanel();
      },
    },
    mounted() {
      this.initData();
      this.initPanel();
    },
    methods: {
      initData() {
        const options = panelOptions();
        let _baseOptions = options.zhCockpit(this.themeType, this.data);
        this.panelOptions = _baseOptions;
      },
      initPanel() {
        if (!this.panelOptions) return;
        this.chart = echarts.init(this.$refs.chart);
        this.drawPanel();
      },
      drawPanel() {
        if (!this.chart) return;
        this.chart.clear();
        this.chart.setOption(this.panelOptions, true);
      },
    },
  };
</script>

<style scoped lang="less">
  .cockpit-panel {
    width: 100%;
    height: 100%;
  }
</style>
