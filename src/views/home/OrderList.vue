<template>
  <div class="wrapper">
    <van-nav-bar
      title="我的订单"
      :border="false"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="assessComplete" ref="search">
      <div v-if="completeList.length == 0" style="text-align:center;">
        <img style="width:3.44rem;margin:2.8rem auto;"  src="../../assets/empty-image-search.png" alt="">
      </div>
      <div v-else>
          <div class="card" v-for="item of completeList" :key="item.id">
            <p class="title">{{ item.createTime }}</p>
            <div class="content">
              <div class="left">
                <van-image
                radius="10"
                  width="1.6rem"
                  height="1.6rem"
                  fit="cover"
                  :src="item.url"
                />
              </div>
              <div class="right">
                <p class="van-multi-ellipsis--l3 one">{{ item.name }}</p>
              </div>
            </div>
            <p class="price">实付：￥{{item.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { getOrederList } from "@/api/request.js";
export default {
  name: "",
  data() {
    return {
      completeList: [],
    };
  },

  components: {},
  computed: {},
  methods: {
    async getOrederList() {
      let res = await getOrederList();
      if (res.data.code != "200")
        return this.$toast({ message: "获取列表失败", position: "bottom" });
      this.completeList = res.data.data;
      this.bscrollCall()
    },
    bscrollCall() {
      setTimeout((_) => {
        new Bscroll(this.$refs.search, {
          click: true,
        });
      }, 500);
    },
  },
  created() {},
  mounted() {
    this.getOrederList();
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  padding: 1rem 0.24rem 0.24rem;
  height: 100%;
  background: #f0f0f0;
}
.assessComplete {
  // margin-top: 0.88rem;
  height: 100%;
  overflow: hidden;
  .card {
    margin-top: 0.2rem;
    background: #fff;
    padding: 0.24rem;
    .title {
      padding-bottom: 0.14rem;
      border-bottom: 1px solid #e5e5e5;
    }
    .price{
        color: #d53c3e;
        text-align: right;
      }
    .content {
      padding-top: 0.14rem;
      display: flex;
      justify-content: space-between;
      .right {
        width: 70%;
        .one {
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
      }
    }
  }
}
</style>