<template>
  <div class="videoColumn">
    <van-nav-bar
      :title="type"
      left-arrow
      fixed
      :border="false"
      @click-left="$router.push('/video')"
    ></van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-row
        class="van-hairline--surround"
        type="flex"
        gutter="15"
        style="flex-wrap:wrap;"
        justify="space-between"
      >
        <van-col
          class="van-col"
          span="12"
          v-for="item of videoInfo"
          :key="item.id"
          @click="toCon(item.id)"
        >
          <van-image
            :src="item.videoDetailsUrl"
            fit="cover"
            radius="8"
            height="1.7rem"
          >
            <!-- 播放标识插槽 -->
            <template v-slot:default>
              <div class="cover1">{{item.videoDuration}}</div>
            </template>
            <template v-slot:loading></template>
          </van-image>
          <p class="ClumnTitle van-ellipsis">
            {{item.title}}
          </p>
          <p class="description van-multi-ellipsis--l2">
            {{item.details}}
          </p>
          <!-- <div class="bottom">
            <span class="iconfont icon-jiageqian"></span><span> {{item.price}}</span>
          </div> -->
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import {getVideoList,getVideo} from '@/api/request.js'
export default {
  name: "videocolumn",
  data() {
    return {
      type: "",
      loading: false,
      finished: false,
      error: false,
      scrollHeightRecord: [],
      query:{
        page:1,
        size:10
      },
      videoInfo: [],
      total: ''
    };
  },

  components: {},
  computed: {},
  methods: {
    async onLoad() {
      this.query.page += 1;
      let res = await getVideoList(this.$qs.stringify(this.query));
      if(res.data.code != '200') return this.$toast({ message: "视频列表获取失败！", position: "bottom" });
      this.videoInfo.push(...res.data.data.records)
      this.loading = false
      if(this.videoInfo.length >= this.total) {
        this.finished = true
      }
    },
    async toCon(item){
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      this.scrollHeightRecord.push(top)
      this.$router.push(`/videocon/${item}`);
      // try {
      //   let res = await getVideo(item);
      //   if (res.data.message == "获取视屏成功") {
      //     this.$router.push(`/videocon/${item}`);
      //   } 
      //   else {
      //     this.$router.push(`/pay/${item}?type=video`);
      //   }
      // } catch (e) {
      //   return this.$toast({ message: '意外错误', position: "bottom" });
      // }
    },
    async getVideoList(){
      let res = await getVideoList(this.$qs.stringify(this.query));
      if(res.data.code != '200') return this.$toast({ message: "视频列表获取失败！", position: "bottom" });
      this.videoInfo = res.data.data.records
      this.total = res.data.data.total
    }
  },
  deactivated() {
    let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      this.scrollHeightRecord.push(top);
  },
  activated() {
    if (this.scrollHeightRecord.length != 0) {
      let top = this.scrollHeightRecord[this.scrollHeightRecord.length - 1];
      setTimeout((_) => {
        scrollTo(0, top);
      }, 10);
    }
  },
  created() {},
  mounted() {
    let type = this.$route.query.type;
    if (type == "guess") return (this.type = "猜你喜欢");
    else this.type = "精品视频";
    this.getVideoList()
  },
};
</script>

<style lang="less" scoped>
.van-list {
  padding: 0.88rem 0.24rem 0;
  .van-row {
    padding: 0.3rem 0;
    .van-col {
      margin-bottom: 0.24rem;
      .van-image {
        width: 100%;
        /deep/ .cover {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background: #000 url(../../assets/player.png) center no-repeat;
          background-size: 0.72rem 0.72rem;
          opacity: 0.4;
        }
        /deep/ .cover1 {
          font-size: 0.22rem;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background: #000;
          background-size: 0.72rem 0.72rem;
          opacity: 0.4;
          text-align: right;
          color: #fff;
          padding-right: 0.16rem;
          padding-top: 0.2rem;
        }
      }
      .ClumnTitle {
        margin: 0.2rem 0 0.1rem;
      }
      .description {
        color: #a0a0a0;
        font-size: 0.24rem;
        line-height: 0.36rem;
        margin-top: 0.1rem;
      }
      .bottom {
        color: #d53c3e;
      }
    }
  }
}
</style>
