<template>
  <div class="metal-panel" ref="panel"></div>
</template>

<script>
  import * as echarts from "echarts";
  import panelOptions from "./panelOptions.js";
  import echartResize from "@/mixins/echartResize";
  export default {
    name: "metal-panel",
    components: {},
    mixins: [echartResize],
    props: {
      data: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        panelOptions: null,
        chart: null
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
        }
      }
    },
    mounted() {
      this.initData();
      this.initPanel();
    },
    methods: {
      initData() {
        const options = panelOptions();
        let _baseOptions = options.metal(this.data);
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
      }
    }
  };
</script>

<style scoped lang="less">
  .metal-panel {
    width: 250px;
    height: 250px;
    background-image: url("../../assets/panel/panel_round1.png");
    background-size: 180px 180px;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>