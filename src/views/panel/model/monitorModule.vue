<template>
  <div class="monitor-module wbgc-shallow">
    <div class="monitor-module-title">
      <p>{{ title }}</p>
    </div>
    <div class="monitor-module-part">
      <div v-for="(data, index) in list" :key="index" class="wpg-bs">
        <panel-card
          :themeType="themeType"
          :data="data"
          abnormal
          class="monitor-module-part-card"
          v-if="themeType === 'light'"
        ></panel-card>
        <panel-card
          :themeType="themeType"
          class="monitor-module-part-card"
          :panelType="darkType"
          abnormal
          :data="data"
          v-else
        ></panel-card>
      </div>
    </div>
  </div>
</template>

<script>
  import panelCard from "@/component/panelCard/index.vue";
  export default {
    name: "monitor-module",
    components: { panelCard },
    props: {
      title: {
        type: String,
        default: "",
      },
      list: {
        type: Array,
        default: () => [],
      },
      themeType: {
        type: String,
        default: "light",
      },
      darkType: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
      };
    },
    methods: {
    },
  };
</script>

<style scoped lang="less">
  .monitor-module {
    border-radius: 4px;
    padding-bottom: 8px;
    margin-bottom: 12px;
    &-title {
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      P {
        font-size: 16px;
        color: #6281a3;
      }
      div {
        font-size: 14px;
        color: #4285f4;
        cursor: pointer;
      }
    }
    &-part {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      & > div {
        width: 32%;
        margin-right: 12px;
        height: 248px;
        margin-bottom: 12px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
</style>