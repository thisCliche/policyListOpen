<template>
  <div>
    <van-nav-bar @click-left="backto" left-arrow></van-nav-bar>
    <div v-if="!isPay" class="tryIt">{{playTip}}</div>
    <div v-if="isRecord" class="playRecord"><van-icon @click="isRecord=false" style="font-size:22px;" name="cross" />是否跳到上次播放位置<span @click="jumpRecord" style="font-size:16px;margin-left:0.1rem;color:#d53c3e">跳转</span></div>
    <video-player
      v-if="isVideo"
      style="position: fixed;left: 0;right: 0;top: 0;"
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @ready="playerReadied"
      @playing.once="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
    >
    </video-player>
    <div class="payVideo" v-else style="position: fixed;left: 0;right: 0;top: 0;">
      <img src="../../assets/ticket-index.png" alt="" />
      <p style="color: #fff; line-height: 0.6rem; margin-bottom: 0.3rem">
        请付{{videoInfo.price}}元后继续观看
      </p>
      <van-button size="small" @click="toBuy">立即购买</van-button>
    </div>
    <div class="detail">
      <p class="title">{{ videoInfo.title }}</p>
      <p class="discript">
        <van-icon
          class-prefix="icon"
          class="iconfont"
          color="#d53c3e"
          name="jieshao"
        />
        {{ videoInfo.details }}
      </p>
      <p class="like">
        <van-row type="flex" justify="space-between">
          <van-col span="4" class="left">{{ isBuy }}</van-col>
          <van-col span="4" :class="likeColor" @click="like"
            ><van-icon class-prefix="icon" class="iconfont" name="dianzan1" />
            点赞</van-col
          >
        </van-row>
      </p>
      <div style="border-bottom: 2px solid #f2f2f2;margin-top:0.44rem;"></div>
    </div>
    <img style="width:100%;" :src="introduceImg" alt="">
    <transition name="van-slide-up">
      <div class="backTop" v-show="!showAbs" @click="backTop">
        <van-icon
          class-prefix="icon"
          class="iconfont"
          color="#d53c3e"
          name="dingbu"
        />
      </div>
    </transition>
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getVideo, getVideourl, setVideoTime } from "@/api/request.js";
export default {
  name: "",
  data() {
    return {
      fromPath: {},
      isVideo: true,
      params: "",
      showAbs: true,
      likeColor: "rightDef",
      distance: 70,
      videoInfo: {},
      show: true,
      playTip:'当前可试看3分钟',
      isPay: false,
      videoUrl: 'https://img.xiaojiayun.top/demoPlayer.mp4',
      playRecord: "",
      playDuration: '',
      isRecord: false,
      introduceImg: '',
    };
  },
  inject:['reload'],
  components: {},
  computed: {
    isBuy() {
      if (this.isPay) {
        return "已购买";
      } else return "未购买";
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
    playerOptions() {
      return {
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            // type: "application/x-mpegURL", // 类型
            type: "video/mp4", // 类型
            // src: "http://hls01open.ys7.com/openlive/6d499d610a0c4a6182e36ac7dca124ad.m3u8", // url地址
            src: this.videoUrl, // url地址
            // src: "https://lmm1120564654.oss-cn-beijing.aliyuncs.com/shipin/2e3ca16e0ba7d35d912d093fbfddc84f.mp4?Expires=1609994097&OSSAccessKeyId=TMP.3Khea7je2CM6nnGTHEh86CDXEam1ZA2papT6zRY7Nrv28HyoQzUFBXBvMMVYf1ivCKK68nkDqf7N3kkREGnhn3oDc3MWS9&Signature=udMawVe5r3iRW97FIb4VVBZCmss%3D", // url地址
          },
          // {
          //   type: "application/x-mpegURL", // 类型
          //   // src: "http://hls01open.ys7.com/openlive/6d499d610a0c4a6182e36ac7dca124ad.m3u8", // url地址
          //   src:
          //     "https://lmm1120564654.oss-cn-beijing.aliyuncs.com/shipin/2e3ca16e0ba7d35d912d093fbfddc84f.mp4?Expires=1609994097&OSSAccessKeyId=TMP.3Khea7je2CM6nnGTHEh86CDXEam1ZA2papT6zRY7Nrv28HyoQzUFBXBvMMVYf1ivCKK68nkDqf7N3kkREGnhn3oDc3MWS9&Signature=udMawVe5r3iRW97FIb4VVBZCmss%3D", // url地址
          // },
        ],
        poster: this.videoInfo.videoDetailsUrl, // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: true,
          fullscreenToggle: true,
        },
      };
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromPath = from;
    });
  },
  methods: {
    playerReadied() {
      setTimeout(_=>{
        if(!this.isPay){
        document.getElementsByClassName(
          "vjs-progress-control"
        )[0].style.pointerEvents = "none";
       }
      },500)
    },
    onPlayerPlaying() {
      if(this.playRecord != '' && this.isRecord == false && this.isPay == true) {
        this.isRecord = true
      }
    },
    onPlayerTimeupdate($event) {
      if(!this.isPay){
        let duration = this.$refs.videoPlayer.player.currentTime()
          if(duration>180){
          this.player.pause()
          this.isVideo = false 
          this.playTip = '试看已结束'
        }
      }
      this.playDuration = this.$refs.videoPlayer.player.currentTime()
    },
    jumpRecord() {
      this.$refs.videoPlayer.player.currentTime(this.playRecord)
      this.isRecord=false
    },
    toBuy() {
      this.$router.push(`/pay/${this.params}?type=video`);
    },
    callvideoResult(val) {
      // 判断支付成功与否
      if(val == '成功') {
        this.reload();
      }else{
        this.$toast({ message: '订单支付失败', position: "bottom" });
      }
    },
    backto() {
      this.$router.go(-1);
      // let path = this.fromPath.path;
      // let newPath = path.substring(0, 4);
      // if (newPath == "/pay") {
      //   this.$router.push("/video");
      // } else {
      //   this.$router.go(-1);
      // }
    },
    like() {
      this.likeColor = this.likeColor == "rightDef" ? "rightSele" : "rightDef";
    },
    // 返回顶部
    backTop() {
      let start = document.documentElement.scrollTop;
      let that = this;
      function gotop() {
        scrollTo(0, start - that.distance);
        start = start - that.distance;
        if (start > 0) {
          window.requestAnimationFrame(gotop);
        }
      }
      window.requestAnimationFrame(gotop);
    },
    // 返回顶部按钮随着滚动渐显的效果
    handleScroll() {
      const top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      if (top > 260) {
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    },
    async getVideo() {
      let res = await getVideo(this.params);
      this.show = false
      this.videoInfo = res.data.data.cVideo;
      if(res.data.data.image[0]) {
        this.introduceImg = res.data.data.image[0].url
      }
      if(res.data.data.videoTime) {
        this.playRecord = res.data.data.videoTime.time
      }
    },
    async getVideourl() {
      let res = await getVideourl(this.params)
      if (res.data.code == "200") {
        this.isVideo = true;
        this.isPay = true
      }
      this.videoUrl = res.data.data.url
    }
  },
  created() {},
  mounted() {
    this.params = this.$route.params.id;
    window.callvideoResult = this.callvideoResult
    window.addEventListener("scroll", this.handleScroll);
    this.getVideo();
    this.getVideourl()
  },
  destroyed() {
    setVideoTime(this.$qs.stringify({time:this.playDuration,videoId:this.params}))
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/videocon.less";
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.payVideo {
  width: 100%;
  height: 4.64rem;
  display: flex;
  justify-content: center;
  background: #333;
  flex-direction: column;
  align-items: center;
  img {
    width: 1.9rem;
  }
}
.playRecord{
  background: rgba(0, 0, 0, 0.4);
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
  position: fixed;
  z-index: 99;
  left: 10px;
  top: 150px;
  display: flex;
  align-items: center;
  padding: .14rem;
  border-radius: .1rem;
  .van-icon{
    font-size:20px;
    margin-right: 0.1rem;
  }
}
.tryIt {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  line-height: 0.64rem;
  top: 0;
}
</style>
