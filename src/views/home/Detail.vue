<template>
  <div>
    <van-nav-bar
      title="政策详情"
      fixed
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
  <div class="detail">
    <div style="font-size:0.32rem;line-height:0.4rem;font-weight:700;text-align:center;" v-html="info.title"></div>
    <div style="overflow:hidden;margin:0.3rem 0 0.2rem;"><a class="source" :href="info.url">原文链接</a><p class="time">发布时间：{{time}}</p></div>
    <div style="line-height:0.4rem;" v-html="info.content"></div>
  </div>
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
  </div>
</template>

<script>
import {getJspaPolicyInfo} from '@/api/request.js'
import axios from 'axios'
const service1 = axios.create({
  baseURL: 'https://qixianfeng.ave.cc/apis/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
service1.interceptors.request.use(config => {
  config.headers['token'] = '488b9faad488fcc05dd80a1287bc2b34'
  return config
})
export default {
  name: '',
  data () {
    return {
      id:'',
      showAbs: true,
      distance: 170,
      info:{}
    }
  },

  components: {
  },
  computed: {
    time() {
      if(this.info.handleTime) return this.info.handleTime.substring(0,10)
    },
    isShary(){
      if(window.localStorage.getItem('token') === null) return true
      else false
    }
  },
  methods: {
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
    async getContent() {
      if(window.localStorage.getItem('token') === null){
        let res = await service1({
          url: `appnews/jspaPolicy/getJspaPolicyInfo`,
          method: 'post',
          data: this.$qs.stringify({id:this.id}),
          headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
        })
        this.info = res.data.data
      }else{
        try{
          let res = await getJspaPolicyInfo(this.$qs.stringify({id:this.id}))
          if (res.data.code != "200") return this.$toast({ message: "试看结束！", position: "bottom" });
          this.info = res.data.data
        }catch(e){
          console.log(e)
          // this.$toast({ message: e, position: "bottom" });
        }
      }
    }
  },
  created() {
  },
  mounted() {
    this.id = this.$route.params.id
    window.addEventListener("scroll", this.handleScroll);
    this.getContent()
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="less" scoped>
.detail{
  padding: 1.4rem 0.24rem 0.24rem;
  overflow: hidden;
  .source{
    float: left;
  }
.time{
  float: right;
  font-size: .26rem;
  color: rgb(156, 156, 156);
}

}
.backTop {
  position: fixed;
  right: 0.3rem;
  bottom: 0.5rem;
  background: #fbe1e1;
  border-radius: 50%;
  padding: 0.05rem;
  box-shadow: 0px 3px 2px #cacaca;
  .iconfont {
    font-size: 36px;
  }
  }
</style>