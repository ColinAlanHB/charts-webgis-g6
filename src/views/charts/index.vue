<template>
    <div>
        <card :theme="theme"></card>
    </div>
</template>
<script>
import card from '../../component/charts/card.vue';
export default {
  components: { card },
  name:'charts',
  data(){
    return {
      theme:'lightTheme'
    }
  },
  mounted(){
      
  }
}
</script>
<style lang="less">

</style>