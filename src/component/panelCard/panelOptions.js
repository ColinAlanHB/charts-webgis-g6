import _ from "lodash";
import * as echarts from "echarts";

const type = "gauge";
const dividing = function (themeType, originParams = {}) {
  let offsetAngle = -35;
  let totalAngle = 250;
  let split = 30;
  let asisWidth = 16;
  let fontSize = 26;
  let series = [];
  let lineWidth = 3;

  let color;
  if (themeType === "light") {
    color = {
      titleColor: "#4A4A4A",
      unitColor: "#999",
      bigTickColor: "#EFF2F6",
      smallTickColor: "#E6ECF5",
      labelColor: "#C3CDDB",
    };
  } else {
    color = {
      titleColor: "#FFFFFF",
      unitColor: "#999",
      bigTickColor: "#373D4A",
      smallTickColor: "#495162",
      labelColor: "#C3CDDB",
    };
  }

  let params = _.assign(
    {
      value: 0.45,
      min: 0,
      max: 0.7,
      name: "",
      unit: "MPa",
      image: "panel_bg2",
    },
    originParams
  );
  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - (params.value / params.max) * totalAngle;
    rate = params.value / params.max;
  }

  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: "90%",
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      length: asisWidth,
      splitNumber: Math.floor(rate * split) + 1,
      lineStyle: {
        color: {
          image: document.getElementById(params.image),
          repeat: "repeat",
        },
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "0%"],
      formatter: function (val) {
        return val.toFixed(2) + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 10,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //大灰色圆盘
  series.push({
    name: "",
    radius: "90%",
    type: type,
    startAngle: endAngle,
    endAngle: offsetAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: split - Math.floor(rate * split),
      lineStyle: {
        color: color.bigTickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //小灰色圆盘
  series.push({
    name: "",
    radius: "72%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    splitNumber: 2,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      length: 5,
      splitNumber: split / 2,
      lineStyle: {
        color: color.smallTickColor,
        width: lineWidth - 1,
      },
    },
    axisLabel: {
      show: true,
      color: color.labelColor,
      fontSize: 10,
      fontFamily: "PingFangSC-Regular",
      formatter: function (value) {
        if (value === 0) {
          return 0;
        }
        return (params.max * value) / 100;
      },
    },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //末尾指针
  series.push({
    type: "gauge",
    radius: "98%",
    startAngle: endAngle,
    endAngle: endAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    title: { show: false },
    detail: { show: false },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth + 10,
      splitNumber: 1,
      lineStyle: {
        color: {
          image: document.getElementById(params.image),

          repeat: "no-repeat",
        },
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    itemStyle: {},
    data: [
      {
        value: params.value,
        name: "",
      },
    ],
  });
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series,
  };
};

const line = function (colorTheme, originParams = {}) {
  let offsetAngle = -50;
  let totalAngle = 280;
  let split = 60;
  let asisWidth = 13;
  let fontSize = 26;
  let series = [];
  let lineWidth = 1;

  let color = {
    titleColor: "#FFFFFF",
    unitColor: "#C3CDDB",
    bigTickColor: "#373D4A",
    tickColor: "#5DD7FD", //圆盘才色
    tipTickColor: "#46D7FF", //指针颜色
    labelColor: "#C3CDDB",
  };

  let params = _.assign(
    {
      value: 65,
      min: 0,
      max: 100,
      name: "",
      type: "gauge",
      unit: "",
      unitNum: 0,
    },
    originParams
  );

  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - Math.floor((params.value / params.max) * totalAngle);
    rate = params.value / (params.max - params.min);
  }
  //小灰色圆盘
  series.push({
    name: "",
    radius: "70%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    splitNumber: 2,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      show: false,
      length: 5,
      splitNumber: split / 2,
      lineStyle: {
        color: color.smallTickColor,
        width: lineWidth - 1,
      },
    },
    axisLabel: {
      show: true,
      color: color.labelColor,
      fontSize: 10,
      fontFamily: "PingFangSC-Regular",
      formatter: function (value) {
        if (value === 0) {
          return 0;
        }
        return (params.max * value) / 100;
      },
    },
    pointer: { show: false },
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: "61%",
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: true,
      roundCap: true,
      lineStyle: {
        width: 8,
        color: [
          [
            1,
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0.1,
                color: "#FA256B",
              },
              {
                offset: 1,
                color: "#8D4DE8",
              },
            ]),
          ],
        ],
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      show: false,
      length: asisWidth,
      splitNumber: Math.floor(rate * split),
      lineStyle: {
        color: color.tickColor,
        width: lineWidth + 1,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "18%"],
      formatter: function (val) {
        return val.toFixed(params.unitNum) + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 10,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //末尾指针
  series.push({
    type: "gauge",
    radius: "72%",
    startAngle: endAngle,
    endAngle: endAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    title: { show: false },
    detail: { show: false },
    splitLine: { show: false },
    axisTick: {
      show: false,
      length: asisWidth,
      splitNumber: 1,
      lineStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0.1,
            color: "#FA256B",
          },
          {
            offset: 1,
            color: "#8D4DE8",
          },
        ]),
        width: lineWidth + 2,
        cap: "round",
      },
    },
    axisLabel: { show: false },
    pointer: {
      show: false,
    },
    itemStyle: {},
    data: [
      {
        value: "",
        name: "",
      },
    ],
  });
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    backgroundColor: "transparent",
    series,
  };
};

const metal = function (originParams = {}) {
  let offsetAngle = -55;
  let totalAngle = 290;
  let split = 60;
  let asisWidth = 13;
  let fontSize = 20;
  let series = [];
  let lineWidth = 1;

  let color = {
    titleColor: "#5DD8FE ",
    unitColor: "#C3CDDB",
    bigTickColor: "#373D4A",
    tickColor: "#5DD7FD", //圆盘才色
    tipTickColor: "#5DD8FE", //指针颜色
    labelColor: "#C3CDDB",
  };

  let params = _.assign(
    {
      value: 0.33,
      min: 0,
      max: 0.7,
      name: "",
      type: "gauge",
      unit: "",
      unitNum: 2,
    },
    originParams
  );

  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - Math.floor((params.value / params.max) * totalAngle);
    rate = params.value / (params.max - params.min);
  }

  //小灰色圆盘
  series.push({
    name: "",
    radius: "63%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    splitNumber: 2,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      show: false,
      length: 5,
      splitNumber: split / 2,
      lineStyle: {
        color: color.smallTickColor,
        width: lineWidth - 1,
      },
    },
    axisLabel: {
      show: true,
      color: color.labelColor,
      fontSize: 10,
      fontFamily: "PingFangSC-Regular",
      formatter: function (value) {
        if (value === 0) {
          return 0;
        }
        return (params.max * value) / 100;
      },
    },
    pointer: { show: false },
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: "49%",
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: true,
      lineStyle: {
        width: 2,
        color: [[1, "#52D6FF"]],
        shadowColor: "#54D6FF",
        shadowBlur: 3,
        shadowOffsetX: 2,
        shadowOffsetY: 0,
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      show: false,
      length: asisWidth,
      splitNumber: Math.floor(rate * split),
      lineStyle: {
        color: color.tickColor,
        width: lineWidth + 1,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "8%"],
      formatter: function (val) {
        return val.toFixed(params.unitNum) + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 10,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //末尾指针
  series.push({
    type: "gauge",
    radius: "66%",
    startAngle: endAngle,
    endAngle: endAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    title: { show: false },
    detail: { show: false },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: 1,
      lineStyle: {
        color: color.tipTickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    itemStyle: {},
    data: [
      {
        value: "",
        name: "",
      },
    ],
  });
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    backgroundColor: "transparent",
    series,
  };
};

const solid = function (themeType, originParams = {}, moudel) {
  let offsetAngle = -55;
  let totalAngle = 290;
  let split = 60;
  let asisWidth = 13;
  let fontSize = 20;
  let series = [];
  let lineWidth = 1;

  let color = {
    titleColor: "#5DD8FE ",
    unitColor: "#C3CDDB",
    bigTickColor: "#373D4A",
    tickColor: "#5DD7FD", //圆盘才色
    tipTickColor: "#5DD8FE", //指针颜色
    labelColor: "#C3CDDB",
  };

  let params = _.assign(
    {
      value: 33,
      min: 0,
      max: 100,
      name: "",
      type: "gauge",
      unit: "",
      image: "panel_bg1",
    },
    originParams
  );

  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - Math.floor((params.value / params.max) * totalAngle);
    rate = params.value / (params.max - params.min);
  }

  //小灰色圆盘
  series.push({
    name: "",
    radius: moudel ? "65%" : "100%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    splitNumber: 2,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      show: false,
      length: 5,
      splitNumber: split / 2,
      lineStyle: {
        color: color.smallTickColor,
        width: lineWidth - 1,
      },
    },
    axisLabel: {
      show: true,
      color: color.labelColor,
      fontSize: 10,
      fontFamily: "PingFangSC-Regular",
      formatter: function (value) {
        if (value === 0) {
          return 0;
        }
        return (params.max * value) / 100;
      },
    },
    pointer: { show: false },
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: moudel ? "68%" : "100%",
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      length: asisWidth,
      splitNumber: Math.floor(rate * split),
      lineStyle: {
        color: color.tickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "5%"],
      formatter: function (val) {
        return val.toFixed(2) + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 10,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //大灰色圆盘
  series.push({
    name: "",
    radius: moudel ? "68%" : "100%",
    type: type,
    startAngle: endAngle,
    endAngle: offsetAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: split - Math.floor(rate * split),
      lineStyle: {
        color: color.bigTickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });

  //末尾指针
  series.push({
    type: "gauge",
    radius: moudel ? "68%" : "100%",
    startAngle: endAngle,
    endAngle: endAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    title: { show: false },
    detail: { show: false },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: 1,
      lineStyle: {
        color: color.tipTickColor,
        width: lineWidth + 1,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    itemStyle: {},
    data: [
      {
        value: params.value,
        name: "",
      },
    ],
  });
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    backgroundColor: "transparent",
    series,
  };
};
const zhCockpit = function (themeType, originParams = {}) {
  let offsetAngle = 0;
  let totalAngle = 180;
  let split = 50;
  let asisWidth = 14;
  let fontSize = 24;
  let series = [];
  let lineWidth = 3;

  let color;
  if (themeType === "light") {
    color = {
      titleColor: "#ffffff",
      unitColor: "#ffffff",
      bigTickColor: "#EFF2F6",
      smallTickColor: "#E6ECF5",
      labelColor: "#C3CDDB",
    };
  } else {
    color = {
      titleColor: "#49BEF8",
      unitColor: "#868E96",
      bigTickColor: "#373D4A",
      smallTickColor: "#495162",
      labelColor: "#868E96",
    };
  }

  let params = _.assign(
    {
      value: 0.45,
      min: 0,
      max: 0.7,
      name: "",
      unit: "MPa",
      image: "panel_bg1",
    },
    originParams
  );
  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - (params.value / params.max) * totalAngle;
    rate = params.value / params.max;
  }

  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: "130%",
    center: ["50%", "60%"],
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      length: asisWidth,
      splitNumber: Math.floor(rate * split) + 1,
      lineStyle: {
        color: {
          image: document.getElementById(params.image),
          repeat: "repeat",
        },
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "-20%"],
      formatter: function (val) {
        return val.toFixed(2) + "%" + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 12,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //小灰色圆盘
  series.push({
    name: "",
    radius: "170%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    center: ["50%", "60%"],
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
      color: color.labelColor,
      fontSize: 12,
      fontFamily: "PingFangSC-Regular",
      distance: 15,
      padding: 0,
      formatter: function (value) {
        if (value === 0) {
          return "  0%";
        }
        return (params.max * value) / 100 + "%";
      },
    },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //大灰色圆盘
  series.push({
    name: "",
    radius: "130%",
    center: ["50%", "60%"],
    type: type,
    startAngle: endAngle,
    endAngle: offsetAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: split - Math.floor(rate * split),
      lineStyle: {
        color: color.bigTickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });

  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series,
  };
};
const cockpit = function (themeType, originParams = {}) {
  let offsetAngle = 0;
  let totalAngle = 180;
  let split = 60;
  let asisWidth = 16;
  let fontSize = 26;
  let series = [];
  let lineWidth = 3;

  let color;
  if (themeType === "light") {
    color = {
      titleColor: "#4A4A4A",
      unitColor: "#999",
      bigTickColor: "#EFF2F6",
      smallTickColor: "#E6ECF5",
      labelColor: "#C3CDDB",
    };
  } else {
    color = {
      titleColor: "#3F8FFF",
      unitColor: "#999",
      bigTickColor: "#373D4A",
      smallTickColor: "#495162",
      labelColor: "#868E96",
    };
  }

  let params = _.assign(
    {
      value: 0.45,
      min: 0,
      max: 0.7,
      name: "",
      unit: "MPa",
      image: "panel_bg1",
    },
    originParams
  );
  let startAngle = totalAngle + offsetAngle;
  let endAngle;
  let rate;
  if (params.value > parseFloat(params.max)) {
    endAngle = offsetAngle;
    rate = 1;
  } else {
    endAngle = startAngle - (params.value / params.max) * totalAngle;
    rate = params.value / params.max;
  }

  //彩色圆盘
  series.push({
    name: params.name,
    type: type,
    radius: "90%",
    startAngle: startAngle,
    endAngle: endAngle,
    splitNumber: 1,
    // 轴线样式
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    // 分段样式
    splitLine: { show: false },
    // 刻度样式
    axisTick: {
      length: asisWidth,
      splitNumber: Math.floor(rate * split) + 1,
      lineStyle: {
        color: {
          image: document.getElementById(params.image),
          repeat: "repeat",
        },
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    detail: {
      valueAnimation: true,
      color: color.titleColor,
      fontSize: fontSize,
      fontFamily: "HelveticaNeue-Medium",
      offsetCenter: [0, "-20%"],
      formatter: function (val) {
        return val.toFixed(2) + "%" + `\n{unit|${params.unit ? params.unit : ""}}`;
      },
      rich: {
        unit: {
          fontSize: 14,
          color: color.unitColor,
          lineHeight: 18,
        },
      },
      value: params.value,
    },
    data: [
      {
        value: params.value,
        name: params.name,
      },
    ],
  });
  //小灰色圆盘
  series.push({
    name: "",
    radius: "125%",
    type: type,
    startAngle: startAngle,
    endAngle: offsetAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: color.labelColor,
      fontSize: 10,
      fontFamily: "PingFangSC-Regular",
      distance: 15,
      padding: 0,
      formatter: function (value) {
        if (value === 0) {
          return "  0%";
        }
        return (params.max * value) / 100 + "%";
      },
    },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });
  //大灰色圆盘
  series.push({
    name: "",
    radius: "90%",
    type: type,
    startAngle: endAngle,
    endAngle: offsetAngle,
    splitNumber: 1,
    axisLine: {
      show: false,
      lineStyle: {
        width: asisWidth,
        opacity: 0,
      },
    },
    splitLine: { show: false },
    axisTick: {
      length: asisWidth,
      splitNumber: split - Math.floor(rate * split),
      lineStyle: {
        color: color.bigTickColor,
        width: lineWidth,
      },
    },
    axisLabel: { show: false },
    pointer: { show: false },
    // 指针样式
    itemStyle: {},
    title: { show: false },
    detail: { show: false },
  });

  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series,
  };
};

export default function () {
  return {
    dividing,
    line,
    metal,
    solid,
    cockpit,
    zhCockpit,
  };
}
