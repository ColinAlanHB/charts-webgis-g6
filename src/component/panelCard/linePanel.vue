<template>
  <div class="line-panel" :class="{ blue: isBlue }" ref="panel"></div>
</template>

<script>
  import * as echarts from "echarts";
  import panelOptions from "./panelOptions.js";
  import echartResize from "@/mixins/echartResize";
  export default {
    name: "line-panel",
    mixins: [echartResize],
    components: {},
    props: {
      data: {
        type: Object,
        default() {
          return {};
        }
      },
      isBlue: {
        type: Boolean,
        default: false
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
        let _baseOptions = options.line(this.isBlue, this.data);
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
  .line-panel {
    width: 250px;
    height: 250px;
    background-image: url("../../assets/panel/panel_round2_red.png");
    background-size: 180px 180px;
    background-repeat: no-repeat;
    background-position: center;
    &.blue {
      background-image: url("../../assets/panel/panel_round2_blue.png");
    }
  }
</style>