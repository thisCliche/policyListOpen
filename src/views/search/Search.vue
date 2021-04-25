<template>
  <div class="search">
    <div class="searchTop">
      <van-row class="searchColumn" type="flex">
        <div class="location van-ellipsis" @click="$router.push('/locationtemp')">
          {{areaName}}
        </div>
        <div style="flex:1;">
          <form action="/">
            <van-search
              v-model.trim="searchVal"
              show-action
              autofocus
              placeholder="请输入搜索关键词"
              shape="round"
              background="#d53c3e"
              @search="onSearch"
              @cancel="$router.go(-1)"
              @clear="onClear"
            />
          </form>
        </div>
      </van-row>
      <van-dropdown-menu z-index="999">
        <van-dropdown-item
          @change="screen"
          v-model="value1"
          :options="option1"
        />
        <van-dropdown-item
        @change="screen"
          v-model="value2"
          :options="option2"
        />
        <van-dropdown-item
        @change="screen"
          v-model="value3"
          :options="option3"
        />
      </van-dropdown-menu>
    </div>
    <div class="searchRes">
      <div class="noSearch" v-if="searchFlag">
        <div class="noSearchTit">
          热门搜索
        </div>
        <div class="noSearchBd">
          <van-tag
            v-for="(item, idx) in searchHot"
            @click="record(item)"
            :key="idx"
            color="#ffffff"
            text-color="#646464"
            type="primary"
            size="large"
            >{{ item }}</van-tag
          >
        </div>
        <div class="noSearchTit">
          历史搜索
        </div>
        <div class="noSearchBd">
          <van-tag
            v-for="(item, idx) in searchValHist"
            :key="idx"
            color="#ffffff"
            @click="record(item)"
            text-color="#646464"
            type="primary"
            size="large"
            >{{ item }}</van-tag
          >
          <p class="clearHist" v-if="clearHistFlag" @click="handlerClearHist">
            清除搜索历史记录
          </p>
          <p class="clearHist" v-else>暂无搜索记录</p>
        </div>
      </div>
      <div class="hasSearch" v-else>
        <van-empty v-if="searchRes.length == 0" image="search" description="未搜索到相关内容" />
          <van-list
          :immediate-check="false"
          v-else
          :error.sync="error"
  error-text="请求失败，点击重新加载"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 每一行 -->
            <van-row
              class="hairline--bottom"
              type="flex"
              @click="toDetial(item.id)"
              v-for="item in searchRes"
              :key="item.id"
              justify="space-between"
            >
              <van-col span="24">
                <p class="title van-ellipsis">
                  <van-tag v-if="item.policy_type == -1" style="margin-right:0.1rem;" type="primary"
                    >政策</van-tag>
                  <van-tag v-else-if="item.policy_type == 2" style="margin-right:0.1rem;" type="success"
                    >申报</van-tag>
                  <van-tag v-else-if="item.policy_type == 1" style="margin-right:0.1rem;" type="danger"
                    >公示</van-tag>
                  <van-tag v-else-if="item.policy_type == 0" style="margin-right:0.1rem;" type="warning"
                    >培训</van-tag>
                  <van-tag v-else color="#7232dd" style="margin-right:0.1rem;"
                    >未分类</van-tag>
                    {{item.orginName}}
                </p>
                <p class="description van-multi-ellipsis--l2"  v-html="item.title">
                </p>
                <div class="bottom">
                  <!-- <span>
                    <span class="iconfont icon-yanjing"></span>408阅读
                  </span> -->
                  <span>
                    <span class="iconfont icon-rili"></span>{{item.handle_time.substr(0,10)}}
                  </span>
                </div>
              </van-col>
              <!-- <van-col span="7">
                <van-image
                  src="http://img.xiaojiayun.top/2020/03/3503899455.jpg"
                  fit="cover"
                  radius="10"
                  height="1.5rem"
                -->
                  <!-- 播放标识插槽 -->
                  <!-- <template v-slot:default>
                    <div class="cover"></div>
                  </template>
                  <template v-slot:loading></template>
                </van-image>
              </van-col> --> 
            </van-row>
          </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getJspaJspaQuery, getJspaPolicy } from "@/api/request.js";
export default {
  name: "",
  data() {
    return {
      test: [1, 2, 3, 4, 5, 6],
      // 列表数据
      searchRes: [],
      areaName: '',
      criCode: "320000",
      list: [],
      error: false,
      loading: false,
      finished: false,
            // 搜索结果显示与否
      searchFlag: true,
      // 输入搜索内容
      searchVal: "",
      // 从换从中取出的搜索内容
      searchValHist: [],
      // 热门搜索
      searchHot: ["企业技术中心", "创新型企业", "高新技术开发企业", "著名商标"],
      value1: -2,  // 发布机构
      value2: 6,  // 新闻类型
      value3: "all",  // 发布时间
      query: {
        criCode: "320000",
        jspaId: "",
        page: 1,
        size: 10,
        policyType: "",
        sreach: "",
        startTime: "",
        Endtime: ""
      },
      total: 0,
      option1: [
        { text: "全部机构", value: -2 },
      ],
      option2: [
        { text: "全部类型", value: 6 },
        // { text: "政策相关", value: -1 },
        { text: "申报相关", value: 2 },
        { text: "公示相关", value: 1 },
        { text: "培训相关", value: 0 },
      ],
      option3: [
        { text: "全部时间", value: "all" },
        { text: "今天", value: "today" },
        { text: "最近一周", value: "week" },
        { text: "最近一个月", value: "month" },
        { text: "最近三个月", value: "thisMonth" },
      ],
    };
  },

  components: {},
  computed: {
    clearHistFlag() {
      if (this.searchValHist.length) return true;
      else false;
    },
    ...mapState(['ereaTemp']),
  },
  methods: {
    toDetial(id){
      this.$router.push(`detail/${id}`)
    },
    record(item) {
      this.searchVal = item;
      this.onSearch(item);
    },
    //滚动到底部会触发的事件
    async onLoad() {
      this.query.page += 1;
      if(this.searchRes.length >= this.total) {
        return this.finished = true;
      }
      let res = await getJspaPolicy(this.$qs.stringify(this.query));
      if(res.data.code != '200') return this.error = true
      this.searchRes.push(...res.data.data.records)
      this.loading = false;
    },
    onSearch(val) {
      if (val.length == 0) return this.$toast("请输入搜索内容");
      this.searchValHist.push(val);
      this.query.sreach = val
      this.getSearchRes();
      // 将历史搜索结果转为字符串存入 localStorage
      localStorage.setItem("searchValHist", JSON.stringify(this.searchValHist));
      this.searchFlag = false;
    },
    onClear() {
      this.searchFlag = true;
      this.query.sreach = ''
      this.getSearchRes();
    },
    // 删除历史记录
    handlerClearHist() {
      this.searchValHist = [];
      localStorage.setItem("searchValHist", JSON.stringify(this.searchValHist));
    },
    // 筛选
    screen() {
      if (this.query.sreach.length == 0) return console.log('请输入搜索内容')
      this.getSearchRes()
    },
    onfocus() {
      this.searchFlag = true
    },
    onBlur() {
      this.searchFlag = false
    },
    // 填写搜索参数
    // 搜索结果
    async getSearchRes() {
      this.query.criCode = this.criCode;
      this.query.jspaId = this.value1 == -2 ? '' : this.value1;
      this.query.policyType = this.value2;
      this.query.startTime = this.getTimeSection(this.value3)[0]
      this.query.Endtime = this.getTimeSection(this.value3)[1]
      this.query.page = 1
      window.scrollTo(0,0)
      this.finished = false
      this.loading = false
      let res = await getJspaPolicy(this.$qs.stringify(this.query));
      if(res.data.code != '200') return this.$toast({ message: "搜索失败！", position: "bottom" });
      this.total = res.data.data.total
      this.searchRes = res.data.data.records
    },
    // 获取发布机构
    async getPublisher() {
      let res = await getJspaJspaQuery(this.criCode);
      if (res.data.code != "200")
        return this.$toast({ message: "发布机构获取失败！", position: "bottom" });
      res = res.data.data
      res.map((value,index,arry)=>{
          this.option1.push({'text':value.name, 'value':value.id})
      })  
    },
    // 时间区间
    getTimeSection(type) {
      let startTime = new Date(), Endtime = new Date();
      switch(type) {
        case 'today':
          startTime = 'today';
          Endtime = 'today';
          break;
        case 'week':
          startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7);
          startTime = this.dateFormat('YYYY-mm-dd',startTime);
          Endtime = this.dateFormat('YYYY-mm-dd',Endtime);
          break;
        case 'month':
          startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 30);
          startTime = this.dateFormat('YYYY-mm-dd',startTime);
          Endtime = this.dateFormat('YYYY-mm-dd',Endtime);
          break;
        case 'thisMonth':
          startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 90);
          startTime = this.dateFormat('YYYY-mm-dd',startTime);
          Endtime = this.dateFormat('YYYY-mm-dd',Endtime);
          break;
        default:
          startTime = '';
          Endtime = '';
      }
      return [startTime,Endtime]
    },
    dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
  },
  created() {
    // 取出存储里的历史搜索记录并转为数组
    this.searchValHist =
      JSON.parse(localStorage.getItem("searchValHist")) || [];
  },
  mounted() {
    this.criCode = this.ereaTemp.code
    this.areaName = this.ereaTemp.name
    this.getPublisher();
    this.getSearchRes()
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/search.less";
</style>
