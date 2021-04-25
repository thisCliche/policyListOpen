<template>
  <div class="index">
    <keep-alive include="Home,Assess,Video">
    <router-view />
    </keep-alive>
    <van-tabbar active-color="#d53c3e" route safe-area-inset-bottom z-index="999">
      <van-tabbar-item replace to="/home">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="xinwenguanli"></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/assess">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="fengxianpinggu"></van-icon>
        <span>评估</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/video">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="shipin"></van-icon>
        <span>视频</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      active: 0,
    };
  },

  components: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.index{
  height: 100%;
  .iconfont{
font-size:20px;
  }
}
</style>