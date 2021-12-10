<template>
    <div style="width:100%;height:100%">
        <BloodKinship></BloodKinship>
		<FieldBlood></FieldBlood>
    </div>
</template>
<script>
import BloodKinship from './BloodKinship/BloodKinship.vue';
import FieldBlood from './FieldBlood/FieldBlood.vue';
export default {
    name:'relation',
    components: { BloodKinship,FieldBlood },
}
</script>
<style lang="less">

</style>