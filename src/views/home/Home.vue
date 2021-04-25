<template>
  <div class="homeList">
    <!-- header区域 -->
    <div class="header">
      <div class="header-left">
        <van-image
          round
          width="0.6rem"
          height="0.6rem"
          :src="avatarUrl"
        ></van-image>
      </div>
      <div @click="$router.push('/search')" class="header-input">
        <van-icon
          class-prefix="icon"
          class="iconfont"
          name="sousuo"
        />高新技术企业
      </div>
      <router-link to="/location">
        <div class="header-right">
          {{areaName}}<van-icon
            class-prefix="icon"
            class="iconfont"
            name="jiantou"
          />
        </div>
      </router-link>
    </div>
    <!-- banner区域 -->
    <div class="bannerWrapper">
      <van-swipe indicator-color="#d53c3e" :autoplay="3000" ref="swipe">
        <van-swipe-item @click="bannerDetail(item.id)" v-for="item in bannerList" :key="item.id">
          <img v-lazy="item.url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- table区域 -->
    <van-tabs swipeable animated v-model="active" :before-change="beforeChange" @change="tabsChange">
      <!-- 政策选项卡 -->
      <van-tab title="政策" name="zcList">
        <!-- 列表区域 -->
        
        <van-pull-refresh v-model="typeStatues.zcList.refreshing" @refresh="onRefresh(-1)">
          <van-list
            :error.sync="typeStatues.zcList.error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-model="typeStatues.zcList.loading"
            :finished="typeStatues.zcList.finished"
            finished-text="没有更多了"
            @load="onLoad(-1, typeStatues.zcList.keepPage)"
          >
            <!-- 每一行 -->
            <van-row
              class="hairline--bottom van-clearfix"
              type="flex"
              v-for="(item,idx) in zcList"
              :key="item.id"
              justify="space-between"
              @click="toDetial(item.id, idx, 'zcList')"
            >
              <van-col span="16">
                <p class="title van-ellipsis">
                  {{ item.orginName }}
                </p>
                <p
                  class="description van-multi-ellipsis--l2"
                  :class="[item.numb == 0 ? 'default':'', item.numb==1 ? 'news': '', item.numb==2 ? 'read': '', item.numb==3 ? 'readnews': '']"
                  v-html="item.title"
                >
                  <!-- {{item.title}} -->
                </p>
                <div class="bottom">
                  <span>
                    <span class="iconfont icon-yanjing"></span
                    >{{ item.read_num }}阅读
                  </span>
                  <span style="margin-right:0.16rem">
                    <span class="iconfont icon-rili"></span
                    >{{ item.handle_time }}
                  </span>
                </div>
              </van-col>
              <van-col span="7">
                <van-image
                  :src="item.imgUrl"
                  fit="cover"
                  radius="10"
                  height="1.5rem"
                >
                  <!-- 播放标识插槽 -->
                  <!-- <template v-slot:default>
                    <div class="cover"></div>
                  </template> -->
                  <template v-slot:loading></template>
                </van-image>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 申报选项卡 -->
      <van-tab title="申报" name="sbList">
        <!-- 列表区域 -->
        <van-skeleton style="padding-top:0.4rem;" v-if="isSkeleton" :row="14" />
        <van-pull-refresh v-model="typeStatues.sbList.refreshing" @refresh="onRefresh(2)">
          <van-list
            :error.sync="typeStatues.sbList.error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-model="typeStatues.sbList.loading"
            :finished="typeStatues.sbList.finished"
            finished-text="没有更多了"
            @load="onLoad(2, typeStatues.sbList.keepPage)"
          >
            <!-- 每一行 -->
            <van-row
              class="hairline--bottom  van-clearfix"
              type="flex"
              v-for="(item,idx) in sbList"
              @click="toDetial(item.id, idx, 'sbList')"
              :key="item.id"
              justify="space-between"
            >
              <van-col span="16">
                <p class="title van-ellipsis">
                  {{ item.orginName }}
                </p>
                <p
                  class="description van-multi-ellipsis--l2"
                  v-html="item.title"
                  :class="[item.numb == 0 ? 'default':'', item.numb==1 ? 'news': '', item.numb==2 ? 'read': '', item.numb==3 ? 'readnews': '']"
                ></p>
                <div class="bottom">
                  <span>
                    <span class="iconfont icon-yanjing"></span
                    >{{ item.read_num }}阅读
                  </span>
                  <span style="margin-right:0.16rem">
                    <span class="iconfont icon-rili"></span
                    >{{ item.handle_time }}
                  </span>
                </div>
              </van-col>
              <van-col span="7">
                <van-image
                  :src="item.imgUrl"
                  fit="cover"
                  radius="10"
                  height="1.5rem"
                >
                  <!-- 播放标识插槽 -->
                  <!-- <template v-slot:default>
                    <div class="cover"></div>
                  </template> -->
                  <template v-slot:loading></template>
                </van-image>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 公示选项卡 -->
      <van-tab title="公示" name="gsList">
        <!-- 列表区域 -->
        <van-pull-refresh v-model="typeStatues.gsList.refreshing" @refresh="onRefresh(1)">
          <van-list
            :error.sync="typeStatues.gsList.error"
  error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-model="typeStatues.gsList.loading"
            :finished="typeStatues.gsList.finished"
            finished-text="没有更多了"
            @load="onLoad(1, typeStatues.gsList.keepPage)"
          >
            <!-- 每一行 -->
            <van-row
              class="hairline--bottom  van-clearfix"
              type="flex"
              v-for="(item,idx) in gsList"
              @click="toDetial(item.id, idx, 'gsList')"
              :key="item.id"
              justify="space-between"
            >
              <van-col span="16">
                <p class="title van-ellipsis">
                  {{ item.orginName }}
                </p>
                <p
                  class="description van-multi-ellipsis--l2"
                  v-html="item.title"
                  :class="[item.numb == 0 ? 'default':'', item.numb==1 ? 'news': '', item.numb==2 ? 'read': '', item.numb==3 ? 'readnews': '']"
                ></p>
                <div class="bottom">
                  <span>
                    <span class="iconfont icon-yanjing"></span
                    >{{ item.read_num }}阅读
                  </span>
                  <span style="margin-right:0.16rem">
                    <span class="iconfont icon-rili"></span
                    >{{ item.handle_time }}
                  </span>
                </div>
              </van-col>
              <van-col span="7">
                <van-image
                  :src="item.imgUrl"
                  fit="cover"
                  radius="10"
                  height="1.5rem"
                >
                  <!-- 播放标识插槽 -->
                  <!-- <template v-slot:default>
                    <div class="cover"></div>
                  </template> -->
                  <template v-slot:loading></template>
                </van-image>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 培训选项卡 -->
      <van-tab title="培训" name="pxList">
        <!-- 列表区域 -->
        <van-pull-refresh v-model="typeStatues.pxList.refreshing" @refresh="onRefresh(0)">
          <van-list
          :error.sync="typeStatues.pxList.error"
  error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-model="typeStatues.pxList.loading"
            :finished="typeStatues.pxList.finished"
            finished-text="没有更多了"
            @load="onLoad(0, typeStatues.pxList.keepPage)"
          >
            <!-- 每一行 -->
            <van-row
              class="hairline--bottom  van-clearfix"
              type="flex"
              v-for="(item,idx) in pxList"
              @click="toDetial(item.id, idx, 'pxList')"
              :key="item.id"
              justify="space-between"
            >
              <van-col span="16">
                <p class="title van-ellipsis">
                  {{ item.orginName }}
                </p>
                <p
                  class="description van-multi-ellipsis--l2"
                  v-html="item.title"
                  :class="[item.numb == 0 ? 'default':'', item.numb==1 ? 'news': '', item.numb==2 ? 'read': '', item.numb==3 ? 'readnews': '']"
                ></p>
                <div class="bottom">
                  <span>
                    <span class="iconfont icon-yanjing"></span
                    >{{ item.read_num }}阅读
                  </span>
                  <span style="margin-right:0.16rem">
                    <span class="iconfont icon-rili"></span
                    >{{ item.handle_time }}
                  </span>
                </div>
              </van-col>
              <van-col span="7">
                <van-image
                  :src="item.imgUrl"
                  fit="cover"
                  radius="10"
                  height="1.5rem"
                >
                  <!-- 播放标识插槽 -->
                  <!-- <template v-slot:default>
                    <div class="cover"></div>
                  </template> -->
                  <template v-slot:loading></template>
                </van-image>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {  mapState, mapActions, mapMutations } from 'vuex'
import { getBanner, getNewsPhone, getpolicy } from "@/api/request.js";
export default {
  name: "Home",
  data() {
    return {
      query: {
        page: 1,
        size:10
      },
      assessList: [],
      areaName: '',
      // 占位加载
      isSkeleton: true,
      // 当前选项卡
      currentTab: ['zcList'],
      avatarUrl: require('../../assets/defualtAvator.png'),
      // tab数据
      active: 'sbList',
      // 列表数据
      list: [],
      criCode: "",
      bannerList: [],
      zcList: [],
      sbList: [],
      gsList: [],
      pxList: [],
      typeStatues: {
        zcList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        sbList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        gsList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        pxList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
      },
      
    };
  },
  components: {},
  computed: {
    newImgQuery() {
      let criCode = this.criCode;
      return { criCode, page: 1, size: 10 };
    },
    newListQuery() {
      let criCode = this.criCode;
      return {
        criCode,
        page: 1,
        size: 10,
        policyType: 0,
      };
    },
    ...mapState(['erea']),
  },
  watch: {},
  methods: {
    ...mapMutations(['changeassesssynopsis']),
    bannerDetail(id) {
      if(id == 30) {
        this.$router.push('/assess')
      }else{
        this.$router.push(`bannerdetail?id=${id}&cricode=${this.criCode}`)
      }
    },
    // 跳转详情页
    toDetial(id,idx,name) {
      Date.prototype.Format = function (fmt) {
          let o = {
              "M+": this.getMonth() + 1, //月份 
              "d+": this.getDate(), //日 
              "H+": this.getHours(), //小时 
              "m+": this.getMinutes(), //分 
              "s+": this.getSeconds(), //秒 
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
              "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
      }
      let today = new Date().Format("yyyy-MM-dd");
      if(this[name][idx].handle_time == today) this[name][idx].numb = 3
      else this[name][idx].numb = 2
      // 给 ios 传递信息
      this.$router.push(`detail/${id}`)
    },
    ...mapActions(['changeCity']),
    //  切换后回到记录位置
    tabsChange(name,title) {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      let currentTab = this.currentTab[this.currentTab.length-1];
      this.typeStatues[currentTab].scrollHeight = top;
      this.currentTab.push(name)

      let top1 = this.typeStatues[name].scrollHeight;
      setTimeout(_=>{
        window.scrollTo(0, top1);
      },10)
    },
    //  切换前记录当前位置
    beforeChange(name) {
      return true
    },
    //滚动到底部会触发的事件
    async onLoad(type, page) {
      try {let newList = await this.baseGetPolicy(type, page);
      this.judgmentType(type).push(...newList);
      let classify = this.judgmentType2(type);
      this.typeStatues[this.judgmentType2(type)].keepPage += 1;
      this.typeStatues[this.judgmentType2(type)].loading = false;
      if (newList.length < 10) {
        this.typeStatues[this.judgmentType2(type)].loading = false;
        this.typeStatues[this.judgmentType2(type)].finished = true;
      }}catch(e) {
        this.typeStatues[this.judgmentType2(type)].error = true;
      }
    },
    
    // 下拉刷新事件
    onRefresh(type) {
      this.typeStatues[this.judgmentType2(type)].finished = false;
      this.typeStatues[this.judgmentType2(type)].loading = true;
      this.reGetPolicy(type);
    },
    
    // 判断类型
    judgmentType(type) {
      switch (type) {
        case -1:
          return this.zcList;
        case 0:
          return this.pxList;
        case 1:
          return this.gsList;
        default:
          return this.sbList;
      }
    },
    // 判断类型
    judgmentType2(type) {
      switch (type) {
        case -1:
          return "zcList";
        case 0:
          return "pxList";
        case 1:
          return "gsList";
        default:
          return "sbList";
      }
    },
    // 获取banner图
    async getBanner() {
      try{ let res = await getBanner(this.criCode);
      if (res.data.code != "200") return this.$toast({ message: "轮播图获取失败！", position: "bottom" });
      this.bannerList = res.data.data;
      this.$refs.swipe.resize();
      } catch(e){
        console.log(e)
      }
    },
    //  获取新闻基础代码
    async baseGetPolicy(idx, page = 1) {
      try{ let newListQuery = this.newListQuery;
      newListQuery.policyType = idx;
      newListQuery.page = page;
      let res = await getpolicy(this.$qs.stringify(newListQuery));
      if (res.data.code != "200")
        return this.$toast({ message: "新闻获取失败！", position: "bottom" });
      let imgRes = await getNewsPhone(this.$qs.stringify(this.newImgQuery));
      if (imgRes.data.code != "200")
        return this.$toast({ message: "新闻图获取失败！", position: "bottom" });
      if(imgRes.data.data.records.length == 0) return this.$toast({ message: "当前城市暂无新闻", position: "bottom" });
      res = res.data.data.records;
      imgRes = imgRes.data.data.records;
      res.forEach((item) => {
        item.handle_time = item.handle_time.substr(0, 10);
      });
      imgRes.forEach((item) => {
        item.imgUrl = item.url;
      });
      imgRes.length = res.length;
      let newList = imgRes.map((key, index) => {
        return { ...key, ...res[index] };
      });
      return newList;
      }catch(e) {
        console.log(e)
      }
    },
    //  刷新新闻列表
    async reGetPolicy(idx) {
      let newList = await this.baseGetPolicy(idx);
      this.judgmentType(idx).splice(0, this.judgmentType(idx).length);
      this.judgmentType(idx).push(...newList);
      this.typeStatues[this.judgmentType2(idx)].refreshing = false;
      this.typeStatues[this.judgmentType2(idx)].loading = false;
    },
    //  获取新闻列表
    async getPolicy(idx) {
      let newList = await this.baseGetPolicy(idx);
      this.judgmentType(idx).push(...newList);
      this.isSkeleton = false;
    },
    //  初次获取新闻列表
    async initGetPolicy() {
      for (let i = -1; i < 3; i++) {
        this.getPolicy(i);
      }
    },
  },
  created() {
    // 测试使用
    let criCode = localStorage.getItem('criCode'), areaName = localStorage.getItem('areaName'), avatar = localStorage.getItem('avatar'), token = localStorage.getItem('token');
    this.changeCity({name:areaName,code:criCode,token,avatar})
      this.criCode = criCode
      this.areaName = areaName
      this.avatarUrl = avatar 
      this.getBanner();
      this.initGetPolicy();
    // 正式时候注释
  },
  activated() {
    let criCode = this.erea.code
    if(this.criCode != criCode) {
      this.bannerList= []
      this.zcList= []
      this.sbList= []
      this.gsList= []
      this.pxList= []
      this.typeStatues= {
        zcList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        sbList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        gsList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        pxList: { loading: false, finished: false, refreshing: false, scrollHeight: 0, error: false,keepPage:2 },
        simpleReport: { loading: false, finished: true, refreshing: false,  scrollHeight: 0, error: false,keepPage:2 }
      },
      this.criCode = this.erea.code
      this.areaName = this.erea.name
      this.getBanner();
      this.initGetPolicy();
    }
  },
  mounted() {
    
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/less/home.less";
</style>
