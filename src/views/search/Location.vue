<template>
  <div class="location">
    <!-- 头部导航 -->
    <van-nav-bar
      :border="false"
      fixed
      title="区域选择"
      @click-right="$router.go(-1)"
    >
      <template #right>
        <van-icon class-prefix="icon" class="iconfont" name="guanbi"></van-icon>
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <!-- <city-search :cities="areaList.cities" @searchRes="getSeaRes"></city-search> -->
    <!-- 搜索结果展示 -->
    <!-- <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          class="search-item van-hairline--bottom"
          v-for="(item, idx) of searchList"
          @click="changeDistrict(item.id,item.name)"
          :key="idx"
        >
          {{ item.name }}
        </li>
        <li class="search-item van-hairline--bottom" v-show="hasNoData">
          没有找到匹配数据
        </li>
      </ul>
    </div> -->
    <!-- 省区选择 -->

    <van-collapse v-model="activeName" accordion>
      <van-cell
        title="当前定位"
        icon="location-o"
        is-link
        :value="initCity"
        @click="changeDistrict(initCode, initCity)"
      />
      <van-collapse-item v-if="areaType == '1'" name="3" value="选择城市">
        <template #title>
          当前选择地区：<strong>{{ areaName }}</strong>
        </template>
        <template #default>
          <van-row type="flex" gutter="5">
            <van-col v-for="item of district" :key="item.criId">
              <van-button @click="changeDistrict(item.criCode, item.criName)">{{
                item.criName
              }}</van-button>
            </van-col>
          </van-row>
        </template>
      </van-collapse-item>
      <van-collapse-item v-else-if="areaType == '2'" name="1" value="选择县区">
        <template #title>
          当前选择城市：<strong>{{ areaName }}</strong>
        </template>
        <template #default>
          <van-row type="flex" gutter="5">
            <van-col v-for="item of district" :key="item.criId">
              <van-button @click="changeDistrict(item.criCode, item.criName)">{{
                item.criName
              }}</van-button>
            </van-col>
          </van-row>
        </template>
      </van-collapse-item>
      <van-collapse-item v-else name="4" value="选择同级县区">
        <template #title>
          当前选择县区：<strong>{{ areaName }}</strong>
        </template>
        <template #default>
          <van-row type="flex" gutter="5">
            <van-col v-for="item of district" :key="item.criId">
              <van-button @click="changeDistrict(item.criCode, item.criName)">{{
                item.criName
              }}</van-button>
            </van-col>
          </van-row>
        </template>
      </van-collapse-item>
      <van-cell is-link :value="isSureSelect" @click="changeDistrict('unlimited','unlimited')">
        <template #title>
          请选取地域：<strong>{{unlimitedValue[1]}}</strong>
        </template>
      </van-cell>
    </van-collapse>
    <div class="recentVisit">
      <van-row type="flex" gutter="5" style="flex-wrap: wrap">
          <template v-if="isTopLevel">
            <van-col style="margin: 0.05rem 0" v-for="item of areaList.province" :key="item.id">
              <van-button @click="getSubordinates(item.id, item.name)">{{
                item.name
              }}</van-button>
            </van-col>
          </template>
          <template v-else>
            <van-col style="margin: 0.05rem 0">
              <van-button @click="backLevel">
                上一级
              </van-button>
            </van-col>
            <van-col style="margin: 0.05rem 0" v-for="item of subordinates" :key="item.criCode">
              <van-button v-if="item.criLevel=='2'" @click="getSubordinates(item.criCode, item.criName)">{{
                item.criName
              }}</van-button>
              <van-button v-else @click="selectCounty(item.criCode, item.criName)">{{
                item.criName
              }}</van-button>
            </van-col>
          </template>
        </van-row>
    </div>
    <!-- 最近访问 -->
    <div class="recentVisit" v-if="localtionRecord.length != 0">
      <p class="title">最近访问</p>
      <van-row type="flex" gutter="5" style="flex-wrap: wrap">
        <van-col
          style="margin: 0.05rem 0"
          v-for="item of localtionRecord"
          :key="item.code"
        >
          <van-button @click="changeDistrict(item.code, item.name)">{{
            item.name
          }}</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 城市选择 -->
    <!-- <div class="listContent">
      <van-index-bar :index-list="indexList" highlight-color="#d53c3e">
        <template v-for="(item, key) of areaList.cities">
          <van-index-anchor :index="key" :key="key" />
          <van-cell
            v-for="innerItem of item"
            :key="innerItem.id"
            :title="innerItem.name"
            @click="changeDistrict(innerItem.id,innerItem.name)"
          />
        </template>
      </van-index-bar>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getRegion, getJscodeOpen, getSuperior } from "@/api/request.js";
// import Bscroll from "better-scroll";
import initReaList from "../../assets/js/area.js";
import areaJson from "../../assets/js/areaJson.js";
import CitySearch from "./components/Search.vue";
export default {
  name: "",
  data() {
    return {
      isTopLevel: true,
      subordinates: [],
      unlimitedValue: [],
      areaType: "",
      selectIndex: '',
      selectIndexCode: '',
      areaList: initReaList.cityInfo,
      localtionRecord: [],
      district: [],
      searchList: [],
      keyword: false,
      hasNoData: false,
      activeName: "0",
      criCode: "",
      areaName: "",
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  components: {
    CitySearch,
  },
  computed: {
    // ifCity() {
    //   if (this.areaType == "2") return true;
    //   else return false;
    // },
    isSureSelect() {
      if(this.selectIndex == '2' || this.selectIndex == '3') return '确定'
      else return '请选择'
    },
    ...mapState(["erea"]),
    initCity() {
      return window.localStorage.getItem("areaName");
    },
    initCode() {
      return window.localStorage.getItem("criCode");
    },
  },
  methods: {
    ...mapActions(["changeCity"]),
    getSeaRes(res, status) {
      this.keyword = status;
      this.hasNoData = res.length == 0 ? true : false;
      this.searchList = res;
    },
    async getSubordinates(criCode, name) {
      this.unlimitedValue[0] = criCode
      this.unlimitedValue[1] = name
      this.selectIndexCode = criCode
      let res = await getRegion(criCode)
      this.isTopLevel = false
      this.subordinates = res.data.data
      this.selectIndex = res.data.data[0].criLevel
    },
    async getDistrict() {
      let res = await getRegion(this.criCode);
      if (res.data.code != "200")
        return this.$toast({ message: "行政区获取失败！", position: "bottom" });
      this.district = res.data.data;
    },
    async county() {
      let res = await getSuperior(this.criCode);
      let result = await getRegion(res.data.data.criCode)
      this.district = result.data.data
    },
    async backLevel() {
      if(this.selectIndex == '2') {
        return this.isTopLevel = true
      }
      else{
        let res = await getSuperior(this.selectIndexCode);
        let result = await getRegion(res.data.data.criCode)
        this.subordinates = result.data.data
        this.selectIndex = result.data.data[0].criLevel
      }
      // this.changeCity({
      //   name: res.data.data.criName,
      //   code: res.data.data.criCode,
      // });
      // this.$router.go(-1);
    },
    selectCounty(code, name) {
      this.unlimitedValue.splice(0,1,code)
      this.unlimitedValue.splice(1,1,name)
    },
    async changeDistrict(code, name) {
      if(code == 'unlimited') {
        code = this.unlimitedValue[0]
        name = this.unlimitedValue[1]
        if(this.selectIndex == '') {
          return
        }
      }
      
      let res = await getJscodeOpen(code),
        flag = true;
      if (res.data.code != "200")
        return this.$toast({ message: "选取失败！", position: "bottom" });
      if (res.data.data == "false")
        return this.$dialog.alert({
          title: "提示",
          message: "当前地区暂未开通，请选择其他地区!",
        });
      this.localtionRecord.forEach((item) => {
        if (item.code == code) {
          flag = false;
        }
      });
      if (flag) {
        if (this.localtionRecord.length > 6) this.localtionRecord.shift();
        this.localtionRecord.push({ code, name });
      }
      localStorage.setItem(
        "localtionRecord",
        JSON.stringify(this.localtionRecord)
      );
      // localStorage.setItem('areaName', name);
      // localStorage.setItem('criCode', code);
      this.changeCity({ name, code });
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {
    // 取出存储里的历史搜索记录并转为数组
    this.localtionRecord =
      JSON.parse(localStorage.getItem("localtionRecord")) || [];
    this.criCode = this.erea.code;
    this.areaName = this.erea.name;
    let type = "3",
      flag = false;
    areaJson.cityInfo.province.forEach((item) => {
      if (item.id == this.criCode) {
        type = "1";
        flag = true;
        return;
      }
    });
    if (!flag) {
      areaJson.cityInfo.cities.forEach((item) => {
        if (item.id == this.criCode) return (type = "2");
      });
    }
    this.areaType = type;
    if (this.areaType == "2" || this.areaType == "1") this.getDistrict();
    else this.county()
    // new Bscroll(this.$refs.search, {
    //   click: true,
    // });
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/location.less";
</style>
