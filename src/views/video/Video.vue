<template>
  <div class="homeList">
    <van-nav-bar title="视频" :border="false" fixed></van-nav-bar>
    <div class="container">
      <div style="padding-top: 0.16rem">
        <!-- banner区域 -->
        <div class="bannerWrapper">
          <van-swipe indicator-color="#d53c3e" :autoplay="3000">
            <van-swipe-item v-for="item in images" :key="item.id" @click="toCon(item.id)">
              <img v-lazy="item.imageUrl" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="videoClumn">
          <!-- 猜你喜欢 -->
          <div class="guess">
            <div class="title">
              <p>猜你喜欢</p>
            </div>
            <swiper :options="swiperOption">
              <template v-for="item in videoInfo.cainixihuan">
                <swiper-slide
                  class="van-col"
                  :key="item.id"
                  @click="toCon(item.id)"
                >
                  <van-image
                    :src="item.video_details_url"
                    fit="cover"
                    radius="8"
                    height="1.7rem"
                    @click="toCon(item.id)"
                  >
                    <!-- 播放标识插槽 -->
                    <template v-slot:default>
                      <div class="cover1">{{ item.video_duration }}</div>
                    </template>
                    <template v-slot:loading></template>
                  </van-image>
                  <p class="ClumnTitle van-ellipsis">
                    {{ item.title }}
                  </p>
                  <!-- <div class="bottom">
                    <span class="iconfont icon-jiageqian"></span
                    ><span> {{ item.price }}</span>
                  </div> -->
                </swiper-slide>
              </template>
            </swiper>
          </div>
          <!-- 精品课程 -->
          <div class="Boutique">
            <div class="title">
              <p>精品课程</p>
              <router-link
                to="/videocolumn?type=boutique"
                style="display: flex; align-items: center"
                >全部 <van-icon name="arrow"
              /></router-link>
            </div>
            <van-row
              class="van-hairline--surround"
              type="flex"
              gutter="15"
              style="flex-wrap: wrap"
              justify="space-between"
            >
              <van-col
                class="van-col"
                span="12"
                v-for="item in videoInfo.jingpinshipin"
                :key="item.id"
                @click="toCon(item.id)"
              >
                <van-image
                  :src="item.video_details_url"
                  fit="cover"
                  radius="8"
                  height="1.7rem"
                >
                  <!-- 播放标识插槽 -->
                  <template v-slot:default>
                    <div class="cover1">{{ item.video_duration }}</div>
                  </template>
                  <template v-slot:loading></template>
                </van-image>
                <p class="ClumnTitle van-ellipsis">
                  {{ item.title }}
                </p>
                <p class="description van-multi-ellipsis--l2">
                  {{ item.lecturer_details }}
                </p>
                <!-- <div class="bottom">
                  <span class="iconfont icon-jiageqian"></span
                  ><span> {{ item.price }}</span>
                </div> -->
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { mapState } from "vuex";
import {
  getVideoRadom,
  getVideoBanner,
} from "@/api/request.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "Video",
  data() {
    return {
      swiperOption: {
        autoplay: 2000,
        speed: 1000,
        preventClicks: false,
        slidesPerView: "auto",
        paginationClickable: true,
        spaceBetween: 10,
      },
      test: [1, 2, 3, 4, 5],
      videoInfo: {},
      scrollHeightRecord: [],
      images: [],
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    ...mapState(["erea"]),
  },
  watch: {},
  methods: {
    async toCon(item) {
      this.$router.push(`/videocon/${item}`);
    },

    async getVideoRadom() {
      let res = await getVideoRadom();
      if (res.data.code != "200")
        return this.$toast({ message: "视频获取失败！", position: "bottom" });
      this.videoInfo = res.data.data;
    },
    async getbanner() {
      let bannerRes = await getVideoBanner();
      if (bannerRes.data.code != "200")
        return this.$toast({ message: "banner获取失败！", position: "bottom" });
      this.images = bannerRes.data.data;
    },
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
    this.getVideoRadom();
    this.getbanner();
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/less/video.less";
</style>
