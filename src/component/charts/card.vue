<template>
  <div class="card wpg-bs charts-box">
      <div style="height: 100%">
        <div
          class="card-chart"
          ref="chart"
          v-show="records && records.length"
        ></div>
      </div>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import echartResize from "@/mixins/echartResize";
  import { mergeObject, deepCopy } from "./tools";
  import genEchartOption from "./echatOptions";
  export default {
    mixins: [echartResize],
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      records: {
        type: Array,
        default: () => [],
      },
      echart: {
        type: Object,
        default: () => ({}),
      },
      zoom: {
        type: Boolean,
        default: false,
      },
      theme: {
        type: String,
        default:"lightTheme",
      }
    },
    data() {
      return {
        chart: null,
        zoomend: 20,
        zoomstart: 0,
      };
    },
    watch: {
      records() {
        this.initData();
        this.$nextTick(() => {
          this.initChart();
        });
      },
    },
    mounted() {
      this.initData();
      this.$nextTick(() => {
        this.initChart();
      });
    },
    methods: {
      changeTheme(val) {
        this.$refs.chart && echarts.dispose(this.$refs.chart);
        if (val === "dark") {
          this.theme = "darkTheme";
        } else {
          this.theme = "lightTheme";
        }
        this.initChart();
      },
      initData() {
        function foramateRight(value) {
          return value.toFixed(0) + "%";
        }
        function foramateLeft(value) {
          return value.toFixed(0);
        }
        if (!this.records || !this.records.length) {
          return;
        }
        const { cType: _cType } = this.echart.series[0] || { cTpye: "line" },
          EchartOption = genEchartOption(this.zoom);
        if (~["line", "lineArea", "smoothAreaLine", "stackBar", "bar"].indexOf(_cType)) {
          // 基本类型组合，包括折线、面积折线、平滑面积折线、柱状图、堆叠柱状图
          let _baseOptions = {};
          let series = this.echart.series.map((v) => ({
            type: v.type,
            cType: _cType === "lineArea" ? "areaLine" : _cType,
          }));
          _baseOptions = EchartOption.compose2(series, this.zoomstart, this.zoomend);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          _baseOptions.xAxis[0].data = this.records.map((v) => v[this.columns[0].dataIndex]);
          _baseOptions.series.forEach((v, i) => {
            v.name = this.columns[1 + i].title;
            v.data = this.records.map((item) => {
              return item[this.columns[1 + i]["dataIndex"]];
            });
          });
          //添加右侧百分比轴
          let index = -1;
          this.columns.map((item, i) => {
            if (item.title.includes("率")) {
              index = i;
            }
          });
          /**
           *
           * @param rightSeries 判断 series 中是否有折线图的数据
           *
           * @param leftSeries 判断 series 中是否有除了折线图以外的类型，当都满足时就添加双坐标轴，折线图坐标轴在右边
           */
          let rightSeries = series.find((x) => x.type === "line");
          let leftSeries = series.find((x) => x.type !== "line");
          if (_baseOptions.series.length > 1 && rightSeries && leftSeries && index != -1) {
            let yAxis1 = deepCopy(_baseOptions.yAxis[0]);
            yAxis1.axisLabel.formatter = foramateRight;
            _baseOptions.yAxis = _baseOptions.yAxis.concat(yAxis1);
            _baseOptions.yAxis[0].axisLabel.formatter = foramateLeft;
            _baseOptions.yAxis[1].position = "right";
            // 判断哪一项是有百分比的
            //作此判断的条件：columns的第一项必须是横轴表示年月的
            _baseOptions.series[index - 1].yAxisIndex = 1;
            _baseOptions.yAxis[0].min = 0;
            _baseOptions.yAxis[1].min = 0;
            _baseOptions.series[index - 1].itemStyle ? (_baseOptions.series[index - 1].itemStyle.color = "#FFB800") : "";
            //左Y轴
            let array = [];
            _baseOptions.series.forEach((element) => {
              if (element.yAxisIndex == 0) {
                let numberArray = element.data.filter((item) => item != undefined);
                let numMax = Math.max.apply(null, numberArray);
                array.push(numMax);
              }
            });
          }
          this.echartOptions = _baseOptions;
        } else if (_cType === "reverseBar") {
          // 反转进度柱状图
          let _baseOptions = EchartOption.reverseBar(this.columns.length - 1);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          _baseOptions.yAxis[0].data = this.records.map((v) => v[this.columns[0].dataIndex]);
          _baseOptions.series[0].data = this.records.map((v) => (v[this.columns[1].dataIndex] * 100).toFixed(2));
          _baseOptions.series[0].realtimeSort = true;
          this.echartOptions = _baseOptions;
        } else if (_cType === "reverseStackBar") {
          // 反转堆叠柱状图
          let _baseOptions = EchartOption.reverseStackBar(this.columns.length - 1);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          _baseOptions.yAxis[0].data = this.records.map((v) => v[this.columns[0].dataIndex]);
          _baseOptions.series.forEach((v, i) => {
            v.name = this.columns[1 + i].title;
            v.data = this.records.map((v) => v[this.columns[1 + i].dataIndex]);
          });
          this.echartOptions = _baseOptions;
        } else if (_cType === "circlePie") {
          // 环形饼图
          const _data = this.columns.map((v, i) => {
            const _value = this.records.map((rv, ri) => {
              if (rv.hasOwnProperty(v.dataIndex)) return rv;
            });
            if (Object.keys(this.records[0]).length === 1) {
              return {
                name: v.title,
                value: _value[i] && _value[i][v.dataIndex],
              };
            } else {
              return {
                name: v.title,
                value: this.records[0][v.dataIndex],
              };
            }
          });
          let _baseOptions = EchartOption.circlePie(_data);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          const arrSum = (data) => {
            let sum = 0;
            for (let key in data) {
              sum = sum + data[key];
            }
            return sum;
          }; //对records中的数据进行累加
          _baseOptions.title.subtext = arrSum(this.records[0]);
          _baseOptions.title.text = this.dimName || "总数";
          this.echartOptions = _baseOptions;
        } else if (_cType === "pie") {
          // 饼图
          const _data = this.columns.map((v, i) => {
            const _value = this.records.map((rv, ri) => rv.hasOwnProperty(v.dataIndex) && rv);
            if (Object.keys(this.records[0]).length === 1) {
              return {
                name: v.title,
                value: _value[i] && _value[i][v.dataIndex],
              };
            } else {
              return {
                name: v.title,
                value: this.records[0][v.dataIndex],
              };
            }
          });
          let _baseOptions = EchartOption.pie(_data);
          _baseOptions = mergeObject(this.echart, _baseOptions);
          this.echartOptions = _baseOptions;
        } else if (_cType === "word-cloud") {
          // 云词
          const _data = this.columns.map((v, i) => {
            const _value = this.records.map((rv, ri) => rv.hasOwnProperty(v.dataIndex) && rv);
            if (Object.keys(this.records[0]).length === 1) {
              return {
                name: v.title,
                value: _value[i] && _value[i][v.dataIndex],
              };
            } else {
              return {
                name: v.title,
                value: this.records[0][v.dataIndex],
              };
            }
          });
          let _baseOptions = EchartOption.wordCloud(_data);
          _baseOptions = mergeObject(this.echart, _baseOptions);
          this.echartOptions = _baseOptions;
        } else if (_cType === "rosePie") {
          // 玫瑰饼图
          const _data = this.columns.map((v, i) => {
            const _value = this.records.map((rv, ri) => rv.hasOwnProperty(v.dataIndex) && rv);
            if (Object.keys(this.records[0]).length === 1) {
              return {
                name: v.title,
                value: _value[i] && _value[i][v.dataIndex],
              };
            } else {
              return {
                name: v.title,
                value: this.records[0][v.dataIndex],
              };
            }
          });
          let _baseOptions = EchartOption.rosePie(_data);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          this.echartOptions = _baseOptions;
        } else if (_cType === "radar") {
          // 雷达图
          let _baseOptions = EchartOption.radar(this.records.length);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          _baseOptions.radar[0].indicator = this.columns.map((v) => ({
            name: v.title,
            max: v.max,
          }));
          _baseOptions.radar[0].indicator.shift();
          this.records.map((val, i) => {
            const arr = [];
            this.columns.forEach((item) => {
              arr.push(val[item.dataIndex]);
            });
            arr.shift();
            _baseOptions.series[0].data[i].name = val["org_code"];
            _baseOptions.series[0].data[i].value = arr;
          });
          this.echartOptions = _baseOptions;
        } else if (_cType === "nestedCake") {
          //判断1的位置
          let iColumns = this.columns.indexOf(1);
          let iRecords = this.records.indexOf(1);
          if (iColumns === -1 || iRecords === -1) return;
          //分割
          let column1 = this.columns.slice(0, iColumns);
          let column2 = this.columns.slice(iColumns + 1, this.columns.length);
          let record1 = this.records.slice(0, iRecords);
          let record2 = this.records.slice(iRecords + 1, this.columns.length);
          let data1 = [];
          let data2 = [];
          data1 = column1.map((v) => {
            if (record1[0]) {
              return { name: v.title, value: record1[0][v.dataIndex] };
            } else return {};
          });
          data2 = column2.map((v) => {
            if (record2[0]) {
              return { name: v.title, value: record2[0][v.dataIndex] };
            } else return {};
          });

          let _baseOptions = EchartOption.hollow(data1, data2);
          _baseOptions = mergeObject(_baseOptions, this.echart);
          this.echartOptions = _baseOptions;
        }
      },
      // 图表初始化
      initChart() {
        if (!this.echartOptions) {
          return;
        }
        this.chart = echarts.init(this.$refs.chart, this.theme);
        this.drawChart();
      },
      // 绘制图表
      drawChart() {
        if (!this.chart) return;
        this.chart.clear();
        this.chart.setOption(this.echartOptions, true);
      },
    },
    destroyed() {
      if (this.interval) clearInterval(this.interval);
    },
    deactivated() {
      if (this.interval) clearInterval(this.interval);
    },
  };
</script>

<style lang="less" scoped>
  .charts-box {
    min-height: 200px;
  }
  .card {
    & > div {
      width: 100%;
      height: 100%;
    }

    .wpg-spin {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      // height: 300px;

      /deep/ &-text {
        margin-top: 10px;
      }
    }
  }

  .card-chart {
    height: 100%;
    min-height: 200px;
  }
  .empty {
    padding: 10px;
  }
</style>
