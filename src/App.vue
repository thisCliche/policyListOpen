<template>
  <div id="app" >
    <!-- :style="{height: bodyHeight + 'px'}" -->
    <keep-alive include="Index,videocolumn">
      <router-view v-if="isRouterAlive"/>
    </keep-alive> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRouterAlive:true
    }
  },
  provide () {                                    
            return {
                reload: this.reload                                              
            }
        },
  methods:{
    reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
  },
  mounted() {
    // this.bodyHeight = document.documentElement.clientHeight
  }
}
</script>
<style lang="less">

</style>
