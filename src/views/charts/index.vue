<template>
    <div class="main">
        <card class="main-class" :theme="theme" v-bind="item" v-for="(item,index) in chartData" :key="index"></card>
    </div>
</template>
<script>
import card from '../../component/charts/card.vue';
import chartArray from './data'
export default {
  components: { card },
  name:'charts',
  data(){
    return {
      theme:'lightTheme',
      chartData:[]
    }
  },
  mounted(){
    this.chartData = chartArray;
  }
}
</script>
<style lang="less">
.main {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  &-card {
    height: 200px;
  }
}

</style>