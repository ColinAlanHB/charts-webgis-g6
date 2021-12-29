import * as echarts from "echarts";
import "echarts-wordcloud";
const _colors = [
  {
    baseColor: "#488BFF",
    startColor: "rgba(66,133,244,0.30)",
    startOffset: 0.15,
    endColor: "rgba(66,133,244,0.08)",
  },
  {
    baseColor: "#26CEBA",
    startColor: "rgba(135,206,64,0.30)",
    startOffset: 0.15,
    endColor: "rgba(135,206,64,0.00)",
  },
  {
    baseColor: "#FFC069",
    startColor: "rgba(252,160,0,0.30)",
    startOffset: 0.15,
    endColor: "rgba(252,160,0,0.08)",
  },
  {
    baseColor: "#FD6865",
    startColor: "rgba(149,103,255,0.30)",
    startOffset: 0.15,
    endColor: "rgba(149,103,255,0.08)",
  },
  {
    baseColor: "#6D7EE4",
    startColor: "rgba(255,73,140,0.30)",
    startOffset: 0.15,
    endColor: "rgba(255,73,140,0.08)",
  },
  {
    baseColor: "#FF9C6E",
    startColor: "rgba(215,121,255,0.30)",
    startOffset: 0.15,
    endColor: "rgba(215,121,255,0.08)",
  },
  {
    baseColor: "#81C785",
    startColor: "rgba(72,193,230,0.30)",
    startOffset: 0.15,
    endColor: "rgba(72,193,230,0.08)",
  },
  {
    baseColor: "#B47FEC",
    startColor: "rgba(255,199,4,0.30)",
    startOffset: 0.15,
    endColor: "rgba(255,199,4,0.08)",
  },
  {
    baseColor: "#62A5F6",
    startColor: "rgba(64,201,169,0.30)",
    startOffset: 0.15,
    endColor: "rgba(64,201,169,0.08)",
  },
  {
    baseColor: "#FF85C0",
    startColor: "rgba(205,206,96,0.30)",
    startOffset: 0.15,
    endColor: "rgba(205,206,96,0.08)",
  },
];
const themeColor = {
  labelColor: "#999",
  axisColor: "#e0e7ff",
  splitLineColor: "rgba(222,226,231,.5)",
  line1Color: "#87CE40",
  line2Color: "#4285F4",
};

let zoom = false;
function genAxisOption(type, markNum, startNum, endNum) {
  let _options = {
    grid: {
      containLabel: true,
      top: 10,
      left: zoom ? 15 : 20,
      right: zoom ? 40 : 35,
      bottom: zoom ? 40 : 50,
    },
    title: {
      show: false,
      left: 20,
      text: "营业曲线",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#6281A3",
      },
    },
    tooltip: {
      confine: true,
      trigger: "axis",
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
        lineStyle: {
          color: themeColor.splitLineColor,
        },
        crossStyle: {
          color: themeColor.splitLineColor,
        },
      },
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      bottom: zoom ? 18 : 15,
      padding: [0, 15, 0, 15],
      icon: "rect",
      itemWidth: 8,
      itemHeight: 8,
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          fontSize: zoom ? 14 : 12,
          color: themeColor.labelColor,
        },
        axisLine: {},
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        nameTextStyle: {
          align: "center",
          color: themeColor.labelColor,
        },
        type: "value",
        position: "left",
        axisLabel: {
          fontSize: zoom ? 14 : 12,
          color: themeColor.labelColor,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        max: (extent) => {
          if (markNum) {
            const max = extent.max > markNum ? extent.max : markNum;
            return max;
          }
        },
      },
    ],
  };
  if (type === "bar") {
    _options.legend.itemWidth = zoom ? 10 : 8;
    _options.legend.itemHeight = zoom ? 10 : 8;
    _options.tooltip.axisPointer = {
      type: "shadow",
      shadowStyle: {
        color: "#4285F4",
        opacity: 0.1,
      },
    };
    _options.dataZoom = [
      {
        show: false,
        type: "slider", // 内置在坐标系中
        start: startNum, // 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
        end: endNum, // 数据窗口范围的结束百分比。范围是：0 ~ 100。
        zoomLock: true, //
        showDetail: false, //滑动条上是否显示范围
        fillerColor: "#fff",
        backgroundColor: "rgba(4, 28, 52, 1)",
        borderColor: "rgb(60,114,209)",
        moveHandleSize: 1, //滚动的大小
        height: 3,
      },
    ];
  } else if (type === "bar1") {
    _options.legend.itemWidth = zoom ? 10 : 8;
    _options.legend.itemHeight = zoom ? 10 : 8;
    _options.tooltip.axisPointer = {
      type: "shadow",
      shadowStyle: {
        color: "#4285F4",
        opacity: 0.1,
      },
    };
  }
  return _options;
}

// 折线图
function genLineSeries(i) {
  return {
    yAxisIndex: 0,
    type: "line",
    symbol: "circle",
    symbolSize: 4,
    lineStyle: {
      width: zoom ? 1.5 : 1,
    },
  };
}

// 带marker折线图
function genMarkerLineSeries(i, markNum, name) {
  const _idx = i % _colors.length;
  let markLine;
  if (markNum) {
    markLine = {
      name: name,
      silent: false,
      animation: true,
      symbol: "none",
      lineStyle: {
        color: "red",
      },
      data: [
        {
          yAxis: markNum,
        },
      ],
    };
  } else {
    markLine = null;
  }
  return {
    yAxisIndex: 0,
    type: "line",
    symbol: "circle",
    showSymbol: false,
    symbolSize: 8,
    lineStyle: {
      width: zoom ? 2 : 1.5,
    },
    areaStyle: {
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: _colors[_idx].startOffset || 0,
            color: _colors[_idx].startColor,
          },
          {
            offset: _colors[_idx].endOffset || 1,
            color: _colors[_idx].endColor,
          },
        ],
        global: false, // 缺省为 false
      },
    },
    markLine: markLine,
  };
}

// 折线下变色
function genVisualMap(_options, markNum, releationObj, i) {
  _options.visualMap = [];
  _options.series.forEach((v, i) => {
    _options.visualMap.push({
      show: false,
      seriesIndex: i,
      pieces: [
        {
          gt: 0,
          lte: markNum, //这儿设置基线上下颜色区分 基线下面为绿色
          color: releationObj.sizeRelation == 0 || releationObj.sizeRelation == 1 ? _colors[i].baseColor : "red",
          colorAlpha: 0.6,
        },
        {
          gte: markNum, //这儿设置基线上下颜色区分 基线下面为绿色
          color: releationObj.sizeRelation == 3 || releationObj.sizeRelation == 4 ? _colors[i].baseColor : "red",
          colorAlpha: 0.6,
        },
      ],
    });
  });
  console.log(_options.visualMap, "_options.visualMap");
}

// 面积折线图
function genAreaLineSeries(i) {
  const _idx = i % _colors.length;
  return {
    yAxisIndex: 0,
    type: "line",
    symbol: "circle",
    showSymbol: false,
    symbolSize: 8,
    lineStyle: {
      width: zoom ? 1.5 : 1,
    },
    areaStyle: {
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: _colors[_idx].startOffset || 0,
            color: _colors[_idx].startColor,
          },
          {
            offset: _colors[_idx].endOffset || 1,
            color: _colors[_idx].endColor,
          },
        ],
        global: false, // 缺省为 false
      },
    },
  };
}

// `平滑的面积折线图`
function genSmoothAreaLineSeries(i) {
  const _idx = i % _colors.length;
  return {
    yAxisIndex: 0,
    type: "line",
    symbol: "circle",
    showSymbol: false,
    symbolSize: 8,
    smooth: true,
    itemStyle: {
      color: _colors[_idx].baseColor,
    },
    lineStyle: {
      opacity: 1,
      width: 1,
    },
    areaStyle: {
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: _colors[_idx].startOffset || 0,
            color: _colors[_idx].startColor,
          },
          {
            offset: _colors[_idx].endOffset || 1,
            color: _colors[_idx].endColor,
          },
        ],
        global: false, // 缺省为 false
      },
    },
  };
}


// 柱状图
function genBarSeries(i) {
  return {
    yAxisIndex: 0,
    type: "bar",
    barMaxWidth: zoom ? 10 : 4,
    barGap: "100%",
    itemStyle: {
      barBorderRadius: [5, 5, 0, 0],
    },
    symbol: "circle",
    symbolSize: 4,
  };
}

// 堆叠柱状图
function genStackBarSeries(i) {
  return {
    yAxisIndex: 0,
    type: "bar",
    stack: "default",
    barWidth: zoom ? 10 : 5,
  };
}

function genStackBarLegend(i) {
  return {
    type: "scroll",
    bottom: zoom ? 18 : 15,
    // padding: [5, 20, 5, 0],
    icon: "rect",
    itemWidth: 14,
    itemHeight: 14,
    // itemGap: 20,
    // pageIconSize: zoom ? 16 : 10,
    // pageTextStyle: {
    //   fontSize: zoom ? 14 : 12
    // },
    // textStyle: {
    //   padding: [2, 0, 0, 0],
    //   fontSize: zoom ? 14 : 12
    // }
    padding: [0, 15, 0, 15],
  };
}

function defineLegend(i) {
  return {
    type: "scroll",
    bottom: zoom ? 18 : 15,
    // padding: 5,
    icon: "rect",
    itemWidth: zoom ? 10 : 8,
    itemHeight: zoom ? 10 : 8,
    itemGap: zoom ? 20 : 15,
    pageIconSize: zoom ? 16 : 10,
    pageTextStyle: {
      fontSize: zoom ? 14 : 12,
    },
    textStyle: {
      padding: [2, 0, 0, 0],
      fontSize: zoom ? 16 : 12,
      lineHeight: 16,
      color: themeColor.labelColor,
    },
    padding: [0, 15, 0, 15],
    formatter: function (name) {
      return echarts.format.truncateText(name, 175, "", "…");
    },
    tooltip: {
      show: true,
    },
  };
}

// 生成简单图表的组合配置
function genComposeOptions(typeArr, markNum) {
  // 仅支持折线图和柱状图组合，且坐标轴一致
  let _axisOptions = genAxisOption(typeArr[0].type, markNum);
  _axisOptions.series = typeArr.map(({ type, cType }, i) => {
    switch (cType) {
      case "line":
        return genLineSeries(i);
      case "areaLine":
        return genAreaLineSeries(i);
      case "smoothAreaLine":
        return genSmoothAreaLineSeries(i);
      case "bar":
        return genBarSeries(i);
      case "stackBar":
        return genStackBarSeries(i);
      case "markerLine":
        return genMarkerLineSeries(i, markNum);
      default:
        console.log(`暂不支持${type}类型的${cType}图表组合！`);
    }
  });
  const typeObj = typeArr[0];

  _axisOptions.legend = typeObj.cType === "stackBar" ? genStackBarLegend() : defineLegend();
  return _axisOptions;
}
// 生成简单图表的组合配置2 含多个基线版本
function genComposeOptions2(typeArr, startNum, endNum) {
  // 仅支持折线图和柱状图组合，且坐标轴一致
  let _axisOptions = genAxisOption(typeArr[0].type, null, startNum, endNum);
  _axisOptions.series = typeArr.map((item, i) => {
    switch (item.cType) {
      case "line":
        return genLineSeries(i);
      case "areaLine":
        return genAreaLineSeries(i);
      case "smoothAreaLine":
        return genSmoothAreaLineSeries(i);
      case "bar":
        return genBarSeries(i);
      case "stackBar":
        return genStackBarSeries(i);
      case "markerLine":
        return genMarkerLineSeries(i, item.markNum, item.name);
      default:
        console.log(`暂不支持${type}类型的${cType}图表组合！`);
    }
  });
  const typeObj = typeArr[0];
  _axisOptions.legend = typeObj.cType === "stackBar" ? genStackBarLegend() : defineLegend();
  return _axisOptions;
}

// 生成反转柱状图
function genReverseBarOptions() {
  let _baseOptions = genAxisOption("bar1");
  // 坐标轴反转
  let _tmpAxis = _baseOptions.xAxis;
  _baseOptions.xAxis = _baseOptions.yAxis;
  _baseOptions.yAxis = _tmpAxis;
  _baseOptions.yAxis[0].inverse = true;
  _baseOptions.yAxis[0].animationDuration = 300;
  _baseOptions.yAxis[0].animationDurationUpdate = 300;
  // 创建series
  _baseOptions.series = [
    {
      yAxisIndex: 0,
      type: "bar",
      barWidth: 8,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#0056E5",
            },
            {
              offset: 1,
              color: "#25C4FF",
            },
          ]),
          barBorderRadius: 4,
        },
      },
      showBackground: false,
    },
  ];
  //设置 legend
  _baseOptions.legend = {
    type: "scroll",
    bottom: "2%",
    padding: [5, 20, 5, 0],
    icon: "rect",
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 20,
    pageIconSize: zoom ? 16 : 10,
    pageTextStyle: {
      fontSize: zoom ? 14 : 12,
    },
    textStyle: {
      padding: [2, 0, 0, 0],
      fontSize: zoom ? 14 : 12,
      color: themeColor.labelColor,
    },
    tooltip: {
      show: true,
    },
  };
  return _baseOptions;
}

// 生成反转堆叠柱状图
function genReverseStackBarOptions(seriesLen) {
  let _baseOptions = genAxisOption("bar1");
  // 坐标轴反转
  let _tmpAxis = _baseOptions.xAxis;
  _baseOptions.xAxis = _baseOptions.yAxis;
  _baseOptions.yAxis = _tmpAxis;
  // 创建series
  _baseOptions.series = Array.from({ length: seriesLen }, (_, i) => genStackBarSeries(i));
  return _baseOptions;
}

// 生成饼图配置
function genPieOptions(data) {
  // const _colors = ["#70A6FF", "#66C5FF", "#87CE40", "#FFDF53", "#817DFF"];
  let _options = {
    title: {
      top: "45%",
      left: "25%",
      textAlign: "center",
      textVerticalAlign: "middle",
      itemGap: zoom ? 16 : 12,
      padding: 0,
      textStyle: {
        fontSize: zoom ? 18 : 14,
        fontWeight: "normal",
        color: "#999",
      },
      subtextStyle: {
        fontSize: zoom ? 30 : 20,
        color: "#333",
      },
    },
    tooltip: {
      confine: true,
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      formatter: "{b} : {c} ({d}%)",
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      bottom: "3%",
      icon: "rect",
      itemWidth: zoom ? 10 : 8,
      itemHeight: zoom ? 10 : 8,
      itemGap: zoom ? 20 : 15,
      pageIconSize: zoom ? 16 : 10,
      pageTextStyle: {
        fontSize: zoom ? 14 : 12,
      },
      textStyle: {
        padding: [2, 0, 0, 0],
        fontSize: zoom ? 16 : 12,
        lineHeight: 16,
        color: themeColor.labelColor,
      },
      padding: [0, 15, 0, 15],
      formatter: function (name) {
        return echarts.format.truncateText(name, 175, "", "…");
      },
      tooltip: {
        show: true,
      },
    },
    series: [
      {
        type: "pie",
        center: ["50%", "40%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: data.map((v, i) => {
          return {
            ...v,
          };
        }),
      },
    ],
  };
  return _options;
}
// 生成嵌套饼图配置
function genHollowPieOptions(data1, data2) {
  // const _colors = ["#70A6FF", "#66C5FF", "#87CE40", "#FFDF53", "#817DFF"];
  let _options = {
    // backgroundColor: "#12161d",
    title: {
      top: "35%",
      left: "50%",
      textAlign: "center",
      textVerticalAlign: "middle",
      itemGap: zoom ? 16 : 12,
      padding: 0,
      textStyle: {
        fontSize: zoom ? 18 : 14,
        fontWeight: "normal",
        color: "#999",
      },
      subtextStyle: {
        fontSize: zoom ? 30 : 20,
        color: "#333",
      },
    },
    tooltip: {
      confine: true,
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      formatter: "{b} : {c} ({d}%)",
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      // orient: "vertical",
      // top: "middle",
      bottom: "7%",
      icon: "rect",
      itemWidth: 14,
      itemHeight: 14,
      formatter: function (name) {
        return echarts.format.truncateText(name, 175, "", "…");
      },
      tooltip: {
        show: true,
      },
      padding: [0, 15, 0, 15],
    },
    series: [
      {
        type: "pie",
        center: ["50%", "40%"],
        radius: ["0%", "40%"],
        label: {
          position: "inner",
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: data1.map((v, i) => {
          return {
            ...v,
          };
        }),
      },
      {
        type: "pie",
        center: ["50%", "40%"],
        radius: ["45%", "60%"],
        label: {
          // show: false
        },
        labelLine: {
          // show: false
        },
        data: data2.map((v, i) => {
          return {
            ...v,
          };
        }),
      },
    ],
  };
  return _options;
}
// 生成环形饼图配置
function genCirclePieOptions(data) {
  // const _colors = ["#70A6FF", "#66C5FF", "#87CE40", "#FFDF53", "#817DFF"];
  let _options = {
    // backgroundColor: "#12161d",
    title: {
      top: "35%",
      left: "50%",
      // text: "总数",
      // subtext: "180",
      textAlign: "center",
      textVerticalAlign: "middle",
      itemGap: zoom ? 16 : 12,
      padding: 0,
      textStyle: {
        fontSize: zoom ? 18 : 14,
        fontWeight: "normal",
      },
      subtextStyle: {
        fontSize: zoom ? 30 : 20,
      },
    },
    tooltip: {
      confine: true,
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      formatter: "{b} : {c} ({d}%)",
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      bottom: "3%",
      left: "center",
      icon: "rect",
      itemWidth: zoom ? 10 : 8,
      itemHeight: zoom ? 10 : 8,
      itemGap: zoom ? 20 : 15,
      pageIconSize: zoom ? 16 : 10,
      pageTextStyle: {
        fontSize: zoom ? 14 : 12,
      },
      padding: [0, 15, 0, 15],
      textStyle: {
        padding: [2, 0, 0, 0],
        fontSize: zoom ? 16 : 12,
        lineHeight: 16,
      },
      formatter: function (name) {
        return echarts.format.truncateText(name, 175, "", "…");
      },
      tooltip: {
        show: true,
      },
    },
    series: [
      {
        type: "pie",
        center: ["50%", "40%"],
        radius: ["50%", "70%"],
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data.map((v, i) => {
          return {
            ...v,
          };
        }),
      },
    ],
  };
  return _options;
}
// 生成玫瑰图配置
function genRosePieOptions(data) {
  // const _colors = ["#70A6FF", "#66C5FF", "#87CE40", "#FFDF53", "#817DFF"];
  let _options = {
    // backgroundColor: "#12161d",
    title: {
      top: "45%",
      left: "35%",
      textAlign: "center",
      textVerticalAlign: "middle",
      itemGap: zoom ? 16 : 12,
      padding: 0,
      textStyle: {
        fontSize: zoom ? 18 : 14,
        fontWeight: "normal",
        color: "#999",
      },
      subtextStyle: {
        fontSize: zoom ? 30 : 20,
        color: "#333",
      },
    },
    tooltip: {
      confine: true,
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      formatter: "{b} : {c} ({d}%)",
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      // orient: "vertical",
      bottom: "3%",
      left: "center",
      icon: "rect",
      itemWidth: zoom ? 10 : 8,
      itemHeight: zoom ? 10 : 8,
      itemGap: zoom ? 20 : 15,
      pageIconSize: zoom ? 16 : 10,
      pageTextStyle: {
        fontSize: zoom ? 14 : 12,
      },
      textStyle: {
        padding: [2, 0, 0, 0],
        fontSize: zoom ? 16 : 12,
        lineHeight: 16,
        color: themeColor.labelColor,
      },
      padding: [0, 15, 0, 15],
      formatter: function (name) {
        return echarts.format.truncateText(name, 175, "", "…");
      },
      tooltip: {
        show: true,
      },
    },
    series: [
      {
        type: "pie",
        center: ["50%", "40%"],
        radius: ["25%", "70%"],
        roseType: "area",
        itemStyle: {
          // borderRadius: 8
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data.map((v, i) => {
          return {
            ...v,
          };
        }),
      },
    ],
  };
  return _options;
}
// 生成词云图
function genWordCloudOptions(data) {
  console.log(1231312);
  // const _colors = ["#70A6FF", "#66C5FF", "#87CE40", "#FFDF53", "#817DFF"];
  let _options = {
    // backgroundColor: "#12161d",
    title: {
      top: "45%",
      left: "25%",
      textAlign: "center",
      textVerticalAlign: "middle",
      itemGap: zoom ? 16 : 12,
      padding: 0,
      textStyle: {
        fontSize: zoom ? 18 : 14,
        fontWeight: "normal",
        color: "#999",
      },
      subtextStyle: {
        fontSize: zoom ? 30 : 20,
        color: "#333",
      },
    },
    tooltip: {
      confine: true,
      backgroundColor: "#fff",
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      textStyle: {
        fontSize: zoom ? 14 : 10,
        color: "#666",
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      top: "middle",
      left: "60%",
      icon: "rect",
      itemWidth: zoom ? 10 : 8,
      itemHeight: zoom ? 10 : 8,
      itemGap: zoom ? 20 : 15,
      pageIconSize: zoom ? 16 : 10,
      pageTextStyle: {
        fontSize: zoom ? 14 : 12,
      },
      textStyle: {
        padding: [2, 0, 0, 0],
        fontSize: zoom ? 16 : 12,
        lineHeight: 16,
        color: themeColor.labelColor,
      },
      formatter: function (name) {
        return echarts.format.truncateText(name, 175, "", "…");
      },
      tooltip: {
        show: true,
      },
    },
    series: [
      {
        type: "wordCloud",
        gridSize: 10,
        sizeRange: [14, 24],
        rotationRange: [0, 90, 0, 90],
        textStyle: {
          fontFamily: "sans-serif",
          fontWeight: "bold",
          // Color can be a callback function or a color string
          color: function () {
            // Random color
            return (
              "rgb(" +
              [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(
                ","
              ) +
              ")"
            );
          },
        },
        data: data.map((v, i) => {
          return {
            ...v,
            itemStyle: {
              color: _colors[i % _colors.length].baseColor,
            },
          };
        }),
      },
    ],
  };
  return _options;
}
// 生成雷达图配置
function genRadarOptions(seriesLen) {
  const _colors = [
    { color1: "rgba(129,222,231,0.3)", color2: "rgba(25,60,237,0.3)" },
    { color1: "rgba(175,167,251,0.3)", color2: "rgba(132,121,234,0.3)" },
    { color1: "rgba(71,223,207,0.3)", color2: "rgba(0,174,198,0.3)" },
    { color1: "rgba(255,194,70,0.3)", color2: "rgba(255,212,59,0.3)" },
  ];
  let _options = {
    // backgroundColor: "#12161d",
    tooltip: {
      confine: true,
      axisPointer: {
        type: "cross",
        label: {
          color: "#666",
          backgroundColor: "#fff",
        },
      },
      textStyle: {
        fontSize: zoom ? 10 : 10,
      },
      padding: 10,
      extraCssText: "box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);",
    },
    legend: {
      type: "scroll",
      bottom: zoom ? "15" : "0",
      icon: "rect",
      itemWidth: 20,
      itemHeight: 2,
      itemGap: zoom ? 15 : 15,
      pageIconSize: zoom ? 10 : 10,
      pageTextStyle: {
        fontSize: zoom ? 12 : 12,
      },
      textStyle: {
        padding: [2, 0, 0, 0],
        fontSize: zoom ? 12 : 12,
        lineHeight: 12,
        color: themeColor.labelColor,
      },
      padding: [0, 15, 0, 15],
      formatter(params) {
        return params
          .split(/(.{7})/)
          .filter((v) => v)
          .join("\n");
      },
    },
    radar: [
      {
        // shape: "polygon",
        splitNumber: 3,
        center: zoom ? ["53%", "40%"] : ["50%", "45%"],
        radius: zoom ? ["2%", "45%"] : ["2%", "60%"],
        shape: "circle",
        name: {
          textStyle: {
            fontSize: zoom ? 10 : 12,
            color: "#999",
          },
        },
        nameGap: 12,
        indicator: [{}],
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: "dashed",
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        name: "雷达图",
        type: "radar",

        symbol: "none",
        data: Array.from({ length: seriesLen }, (_, i) => ({
          itemStyle: {
            normal: {
              color: _colors[i % _colors.length].color2,
              lineStyle: {
                color: _colors[i % _colors.length].color2,
              },
            },
          },
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: _colors[i % _colors.length].color1 || "red",
              },
              {
                offset: 1,
                color: _colors[i % _colors.length].color2 || "green",
              },
            ]),
          },
        })),
      },
    ],
  };
  return _options;
}

export default function (_zoom) {
  zoom = !!_zoom;
  return {
    compose: genComposeOptions,
    compose2: genComposeOptions2,
    reverseBar: genReverseBarOptions,
    reverseStackBar: genReverseStackBarOptions,
    circlePie: genCirclePieOptions,
    rosePie: genRosePieOptions,
    hollow: genHollowPieOptions,
    pie: genPieOptions,
    radar: genRadarOptions,
    visualMap: genVisualMap,
    wordCloud: genWordCloudOptions,
  };
}
