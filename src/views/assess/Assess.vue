<template>
  <div class="assess">
      <van-nav-bar
      title="政策评估"
      :border="false"
      fixed
      right-text="我的报告"
      @click-right="toHome"
      left-text="订单"
      @click-left="toOrder"
    ></van-nav-bar>
    
    <div style="position:fixed;top:44px;left:0;right:0;text-align: center;
    color: #fff;
    background: #d53c3e;
    padding-bottom: 0.2rem;z-index:99;">{{assessTitle}}</div>
    
    <van-tabs
      line-height="10"
      line-width="22"
      animated
      swipeable
      v-model="active"
      @change="tabsChange"
      color="#fff"
    >
      <van-tab :name="item.id" v-for="item of assessList" :key="item.id"
        ><img style="width: 100%;padding-bottom:44px;" :src="item.url" alt=""
      /></van-tab>
    </van-tabs>
    <div
      style="
        position: fixed;
        bottom: 50px;
        left:0;
        right:0;
        padding-top: 0.3rem;
        background: #d53c3e;
      "
    >
      <van-button style="width: 100%" color="#d53c3e"  @click="toAssess"
        >立即评估</van-button
      >
    </div>
    <van-action-sheet v-model="show" title="公司名称">
      <div class="content">
        <van-field
          v-model="value"
          label="公司全称"
          placeholder="请输入公司全称"
        />
        <p style="margin-top:0.2rem;margin-left: 0.25rem;font-size: 0.24rem;color: #b9b9b9;">注：公司名称的正确性，会影响到评测结果</p>
        <div style="text-align: center; margin-top: 30px">
          <van-button type="info" style="width: 80%" round @click="toPay"
            >确定</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getMyAssessmentList, sendComplateName } from "@/api/request.js";
import { mapMutations, mapState } from 'vuex';
export default {
  name: "Assess",
  data() {
    return {
      active: 1,
      query: {
        page: 1,
        size: 10,
      },
      assessList: [],
      show: false,
      value: '',
      type: 1,
      cCustomerAssessmentId: '',
      height: ''
    };
  },

  components: {},
  computed: {...mapState(['erea',"companyName"]),
    assessTitle() {
      if(this.type==1) return '国家高新技术企业认定评估'
      else return '科技型中小企业认定评估'
    }
  },
  methods: {
    ...mapMutations(['changeCompany', 'changeHeight']),
    tabsChange(name) {
      this.type = name
      window.scrollTo(0, 0);
    },
    toHome() {
      this.$router.push('/assesscomplete')
    },
    async getMyAssessmentList() {
      let res = await getMyAssessmentList(this.$qs.stringify(this.query));
      if (res.data.code != "200")
        return this.$toast({ message: "评估列表失败！", position: "bottom" });
      this.assessList = res.data.data.records;
    },
    toAssess() {
      this.show = true
    },
    async toPay() {
      if(this.value == '') return this.$toast({ message: "请填写完整", position: "bottom" });
      this.changeCompany(this.value)
      let res = await sendComplateName(this.$qs.stringify({assessmentTypeId:this.type,companyName:this.value}))
      if (res.data.code != '200') return this.$toast({ message: "请重试！", position: "bottom" });
      this.cCustomerAssessmentId = res.data.data.cCustomerAssessmentId
      this.show = false
      if(this.assessList[this.type-1].isFree == 1) {
        this.$router.push(`/assessreport?customer=${res.data.data.cCustomerAssessmentId}`)
      }
      else{
        this.$router.push(
        `/pay/${res.data.data.cCustomerAssessmentId}?customerId=${res.data.data.customerId}&goodId=${this.type}&type=assess`
      );
      }
    },
    toOrder() {
      this.$router.push('/orderlist')
    },
  },
  created() {
  },
  mounted() {
    this.getMyAssessmentList();
    if(this.companyName != '') this.value = this.companyName
  },
};
</script>

<style lang="less" scoped>
.assess{
  padding-bottom: 50px;
  .van-tabs /deep/ .van-tabs__wrap {
  left: 3.1rem;
  position: fixed;
  right: 3.1rem;
  bottom: 95px;
  z-index: 99;
  height: 10px;
  .van-tabs__nav {
    background-color: transparent;
    .van-tab--active {
      .van-tab__text--ellipsis {
        background: transparent !important;
      }
    }
    .van-tab {
       .van-tab__text--ellipsis{
        background: #272626;
        opacity: 0.4;
        border-radius: 50%;
        display: block;
        width: 10px;
        height: 10px;
      }
    }
  }
}
.content {
  padding: 16px 16px 30px;
}
}
</style>