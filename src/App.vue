<template>
  <div id="app" style="width:100%;height:100%">
    <div class="nav">
      <a-radio-group default-value="/charts" button-style="solid" @change='change'>
        <a-radio-button value="/charts">
          图表
        </a-radio-button>
        <a-radio-button value="/g6">
          组态
        </a-radio-button>
        <a-radio-button value="/webgis">
          地图
        </a-radio-button>
        <a-radio-button value="/panel">
          仪表盘
        </a-radio-button>
      </a-radio-group>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
    change(e){
      this.$router.push(e.target.value);
    }
  },
}
</script>

<style lang="less">
.nav {
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f9f9f9;
}


</style>
