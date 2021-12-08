<template>
  <div class="panel-card">
    <component :is="detailPanelType" :data="data" class="charts" :themeType="themeType" :moudel="moudel"></component>
  </div>
</template>

<script>
  import dividingPanel from "./dividingPanel";
  import linePanel from "./linePanel";
  import metalPanel from "./metalPanel";
  import solidPanel from "./solidPanel";
  import cockpitPanel from "./cockpitPanel";
  import zhCockpitPanel from "./zhCockpitPanel";

  export default {
    name: "panelCard",
    components: { dividingPanel, linePanel, metalPanel, solidPanel, cockpitPanel, zhCockpitPanel },
    props: {
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      themeType: {
        type: String,
        default: "dark",
      },
      panelType: {
        type: String,
        default: "dividingPanel",
      },
      moudel: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: "压力指标",
      },
    },
    data() {
      return {};
    },
    computed: {
      detailPanelType() {
        if (this.panelType.indexOf("linePanel") >= 0) {
          return "linePanel";
        }
        return this.panelType;
      },
    },
    watch: {},
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="less">
  .panel-card {
    background: #181c24;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    height: 250px;
    .charts {
      margin: auto;
    }

    .card-left {
      width: 100%;
      position: relative;
      left: 16px;
      top: 12px;
      display: flex;
      align-items: center;
      .card-title {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
  }
</style>
