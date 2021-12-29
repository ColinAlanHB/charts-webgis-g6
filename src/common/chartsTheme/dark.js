const obj = {
  color: [
    "#71a3f8",
    "#3366ff",
    "#3498fd",
    "#21d3f0",
    "#1f40c0",
    "#29dcb1",
    "#3cfb99",
    "#eae138",
    "#87ce40",
    "#adce00",
    "#1098ad",
    "#8479ea",
  ],
  // backgroundColor: "#12161d",
  textStyle: {},

  title: {
    textStyle: {
      color: "#ffffff",
    },
    subtextStyle: {
      color: "#adb5bd",
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
    markLine: {
      label: {
        color: "#fff",
        borderColor: "rgba(255,255,255,0)",
      },
    },
  },
  gauge: {
    axisLabel: {
      color: "#fff",
    },
    title: {
      color: "#fff",
    },
    axisLine: {
      lineStyle: {
        width: 15,
        color: [[1, "#20262f"]],
      },
    },
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    splitLine: {
      lineStyle: {
        color: "#11414F",
      },
    },
    axisLine: {
      lineStyle: {
        type: "dashed",
        color: "#11414F",
      },
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#ccc",
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
    label: {
      color: "#fff",
      borderColor: "rgba(255,255,255,0)",
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  candlestick: {
    itemStyle: {
      color: "#eb5454",
      color0: "#47b262",
      borderColor: "#eb5454",
      borderColor0: "#47b262",
      borderWidth: 1,
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
    lineStyle: {
      width: 1,
      color: "#aaa",
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
    color: [
      "#71a3f8",
      "#3366ff",
      "#3498fd",
      "#21d3f0",
      "#1f40c0",
      "#29dcb1",
      "#3cfb99",
      "#eae138",
      "#87ce40",
      "#adce00",
      "#1098ad",
      "#8479ea",
    ],
    label: {
      color: "#ffffff",
    },
  },
  map: {
    itemStyle: {
      areaColor: "#eee",
      borderColor: "#444",
      borderWidth: 0.5,
    },
    label: {
      color: "#000",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,215,0,0.8)",
        borderColor: "#444",
        borderWidth: 1,
      },
      label: {
        color: "rgb(100,0,0)",
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#eee",
      borderColor: "#444",
      borderWidth: 0.5,
    },
    label: {
      color: "#000",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,215,0,0.8)",
        borderColor: "#444",
        borderWidth: 1,
      },
      label: {
        color: "rgb(100,0,0)",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#282e34",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#868e96",
      },
    },
    axisLabel: {
      show: true,
      color: "#868e96",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#E0E6F1"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: "#6E7079",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#6E7079",
      },
    },
    axisLabel: {
      show: true,
      color: "#6E7079",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#282e34"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: "#6E7079",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#6E7079",
      },
    },
    axisLabel: {
      show: true,
      color: "#6E7079",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#E0E6F1"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#282e34",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#6E7079",
      },
    },
    axisLabel: {
      show: true,
      color: "#fff",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#E0E6F1"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: "#999",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#666",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#868e96",
    },
    pageTextStyle: {
      color: "#868e96",
    },
  },
  tooltip: {
    backgroundColor: "#20262F",
    axisPointer: {
      lineStyle: {
        color: "#ccc",
        width: 1,
      },
      crossStyle: {
        color: "#ccc",
        width: 1,
      },
    },
    textStyle: {
      color: "#fff",
    },
  },
  timeline: {
    lineStyle: {
      color: "#DAE1F5",
      width: 2,
    },
    itemStyle: {
      color: "#A4B1D7",
      borderWidth: 1,
    },
    controlStyle: {
      color: "#A4B1D7",
      borderColor: "#A4B1D7",
      borderWidth: 1,
    },
    checkpointStyle: {
      color: "#316bf3",
      borderColor: "fff",
    },
    label: {
      color: "#A4B1D7",
    },
    emphasis: {
      itemStyle: {
        color: "#FFF",
      },
      controlStyle: {
        color: "#A4B1D7",
        borderColor: "#A4B1D7",
        borderWidth: 1,
      },
      label: {
        color: "#A4B1D7",
      },
    },
  },
  visualMap: {
    color: ["#bf444c", "#d88273", "#f6efa6"],
  },
  dataZoom: {
    handleSize: "undefined%",
    textStyle: {},
  },
  markPoint: {
    label: {
      color: "#ffffff",
    },
    emphasis: {
      label: {
        color: "#ffffff",
      },
    },
  },
};
export default obj;
