<template>
  <div>
    <van-nav-bar
      :title="bannerList.title"
      :border="false"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <img style="width:100%;margin-top:0.84rem;" :src="bannerList.toUrl" alt="">
  </div>
</template>

<script>
import {getBanner} from "@/api/request.js";
export default {
  name: '',
  data () {
    return {
      bannerList: []
    }
  },

  components: {},
  computed: {},
  methods: {
    async getBanner() {
      try{ let res = await getBanner(this.$route.query.cricode);
      if (res.data.code != "200") return this.$toast({ message: "获取失败！", position: "bottom" });
      res.data.data.forEach(item => {
        if(item.id == this.$route.query.id){
          this.bannerList = item
        }
      });
      } catch(e){
        console.log(e)
      }
    }
  },
  created() {},
  mounted() {
    this.getBanner()
  },
}
</script>

<style lang="less" scoped>
</style>