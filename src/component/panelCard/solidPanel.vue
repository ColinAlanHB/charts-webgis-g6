<template>
  <div class="solid-panel" ref="panel"></div>
</template>
<script>
  import * as echarts from "echarts";
  import panelOptions from "./panelOptions.js";
  import echartResize from "@/mixins/echartResize";
  export default {
    name: "solid-panel",
    mixins: [echartResize],
    components: {},
    props: {
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      moudel: {
        type: Boolean,
        default: true,
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
    },
    mounted() {
      this.initData();
      this.initPanel();
    },
    methods: {
      initData() {
        const options = panelOptions();
        let _baseOptions = options.solid(this.themeType, this.data, this.moudel);
        this.panelOptions = _baseOptions;
      },
      initPanel() {
        if (!this.panelOptions) return;
        this.chart = echarts.init(this.$refs.panel);
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
  .solid-panel {
    width: 250px;
    height: 250px;
    background-image: url("../../assets/panel/panel_round3.png");
    background-size: 180px 180px;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>