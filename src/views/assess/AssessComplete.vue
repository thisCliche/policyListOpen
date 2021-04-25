<template>
  <div class="wrapper">
    <van-nav-bar
      title="评估报告"
      fixed
      :border="false"
      left-arrow
      @click-left="toHome"
    ></van-nav-bar>
    <div class="content">
      <div class="title">评估样本</div>
      <div @click="$router.push('/assessreportsample')">
        <van-image
          width="1.4rem"
          height="1.7rem"
          fit="fill"
          radius="10"
          src="https://jiaozi-tarim.oss-cn-hangzhou.aliyuncs.com/qixianfeng/%E8%AF%84%E4%BC%B0%E8%AF%A6%E6%83%85.jpg"
        />
      </div>
      <div class="title" style="margin-top: 0.3rem">我的报告</div>
      <van-empty v-if="completeList.length == 0" image="search" description="暂无评估订单" />
      <div v-else>
        <van-row gutter="14">
          <template v-for="item of completeList">
            <van-col :key="item.id" span="6" style="margin: 10px 0 0px;height: 3rem;" @click="toDetail(item.id)">
              <van-image
                width="1.4rem"
                height="1.7rem"
                fit="fill"
                radius="10"
                src="https://jiaozi-tarim.oss-cn-hangzhou.aliyuncs.com/qixianfeng/%E8%AF%84%E4%BC%B0%E8%AF%A6%E6%83%85.jpg"
              />
              <p>{{item.assessmentTypeName}}{{item.upate_time}}</p>
            </van-col>
          </template>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyAssessmentComList } from "@/api/request.js";
import { mapState } from 'vuex';
export default {
  name: "AssessComplete",
  data() {
    return {
      query: {
        size: 20,
        page: 1,
      },
      completeList: [],
    };
  },
  components: {},
  computed: {...mapState(['height'])},
  methods: {
    toDetail(id){
      this.$router.push(`/assessreporttwo?assessment=${id}`)
    },
    toHome() {
      this.$router.go(-1);
    },
    async getMyAssessmentList() {
      let res = await getMyAssessmentComList(this.$qs.stringify(this.query));
      if (res.data.code != "200")
        return this.$toast({ message: "获取列表失败", position: "bottom" });
      this.completeList = res.data.data.records;
    },
  },
  created() {},
  mounted() {
    this.getMyAssessmentList();
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 1.14rem 0.24rem;
  .title {
    font-size: 0.3rem;
    line-height: 0.48rem;
    margin-bottom: 5px;
  }
  .van-image {
    box-shadow: 0px 0px 10px 2px #d6a2a3;
  }
  p {
    font-size: 0.24rem;
    margin-top: 0.2rem;
    line-height: 0.32rem;
  }
}
</style>