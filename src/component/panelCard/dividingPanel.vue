<template>
  <div class="dividing-panel" ref="panel"></div>
</template>

<script>
  import * as echarts from "echarts";
  import panelOptions from "./panelOptions.js";
  import echartResize from "@/mixins/echartResize";
  export default {
    name: "dividing-panel",
    components: {},
    mixins: [echartResize],
    props: {
      data: {
        type: Object,
        default() {
          return {};
        }
      },
      themeType: {
        type: String,
        default: "dark"
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
        let _baseOptions = options.dividing(this.themeType, this.data);
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
  .dividing-panel {
    width: 250px;
    height: 250px;
  }
</style>
