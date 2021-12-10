<template>
    <div style="height:100%;width:100%">
        <div class="nav">
            <a-radio-group default-value="diagram" button-style="solid" @change='change'>
                <a-radio-button value="diagram">
                组态图
                </a-radio-button>
                <a-radio-button value="overview">
                包含关系
                </a-radio-button>
                <a-radio-button value="relation">
                关系图
                </a-radio-button>
            </a-radio-group>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'relation',
    methods:{
        change(e){
            this.$router.push(e.target.value);
        }
    }
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