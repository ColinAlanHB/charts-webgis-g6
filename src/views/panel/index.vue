<template>
  <div class="monitor dark">
    <img :src="require('../../assets/panel/panel_bg1.png')" id="panel_bg1" style="display: none" @load="loadImage" />
    <img :src="require('../../assets/panel/panel_bg2.png')" id="panel_bg2" style="display: none" @load="loadImage" />
    <img :src="require('../../assets/panel/panel_bg3.png')" id="panel_bg3" style="display: none" @load="loadImage" />
    <div class="monitor-content" v-if="loadImageCount === 3">
    <monitorModule title="压力" :list="pressureData" :themeType="themeType" darkType="metalPanel"></monitorModule>
    <monitorModule title="流量" :list="trafficData" :themeType="themeType" darkType="dividingPanel"></monitorModule>
    <monitorModule title="水质" :list="qualityData" :themeType="themeType" darkType="linePanel-red"></monitorModule>
    <monitorModule title="水位" :list="levelData" :themeType="themeType" darkType="solidPanel"></monitorModule>
    </div>
  </div>
</template>
<script>
 import monitorModule from "./model/monitorModule";
 import {pressureData,trafficData,qualityData,levelData} from './data'

export default {
    name:'panel',
    components:{monitorModule},
    data() {
      return {
        themeType: "dark",
        loadImageCount: 0,
        pressureData: [],
        trafficData: [],
        qualityData: [],
        levelData: [],
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
      loadImage() {
        this.loadImageCount++;
      },
    getData() {
        this.$set(this, "pressureData", pressureData);
        this.$set(this, "trafficData", trafficData);
        this.$set(this, "qualityData", qualityData);
        this.$set(this, "levelData", levelData);
      },
    }
}
</script>
<style lang="less">
.monitor {
    padding: 12px;
    height: 100%;
    overflow-y: auto;
    display: flex;
    &-module {
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

  }

</style>