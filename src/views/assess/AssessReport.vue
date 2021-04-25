<template>
  <div class="assessreport">
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading size="24px" vertical>正在生成报告...</van-loading>
      </div>
    </van-overlay>
    <van-nav-bar
      title="评估报告"
      fixed
      :border="false"
      right-text="完成"
      @click-right="toHome"
    ></van-nav-bar>
    
    <div class="container" v-if="!show">
      <div class="top">
        <div class="circle"></div>
      </div>
      <div class="tableWraper">
        <div class="tableCon">
          <table border="1">
            <tr>
              <th colspan="2" style="line-height: 0.4rem">
                {{ report.title }}
              </th>
            </tr>
            <tr>
              <td align="center">{{ report.companyName }}</td>
              <td align="center">{{ report.time }}</td>
            </tr>
            <template v-if="fail">
              <tr>
                <td colspan="2">
                  <p style="text-indent: 2em">
                    尊敬的{{report.companyName}}，根据国家《高新技术企业认定管理办法》的评分标准，结合权威机构提供的大数据，系统对贵公司的相关数据进行了分析并作出评估，评估结果如下，敬请参考：
                  </p>
                  <div
                    class="scrollWrap"
                    v-if="report.Object.zhuanli.length != 0"
                  >
                    <p style="font-weight: 700">发明专利</p>
                    <table rules="all">
                      <tbody border="1">
                        <tr
                          v-for="(item, idx) of report.Object.zhuanli"
                          :key="idx"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.time }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="scrollWrap"
                    v-if="report.Object.ruanzhu.length != 0"
                  >
                    <p style="font-weight: 700">软件著作权</p>
                    <table rules="all">
                      <tbody border="1">
                        <tr
                          v-for="(item, idx) of report.Object.ruanzhu"
                          :key="idx"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.time }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p
                    style="
                      font-size: 0.18rem;
                      color: #ababab;
                      margin-top: 0.2rem;
                    "
                  >
                    注：本报告提取贵公司三年内的知识产权信息
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  结论：
                  <p style="text-align: center">
                    <img
                      v-if="totalScore >= 70"
                      style="width: 3.28rem"
                      :src="require('../../assets/success.png')"
                      alt=""
                    />
                    <img
                      v-else
                      style="width: 2.28rem; margin-bottom: 0.1rem"
                      :src="require('../../assets/error.png')"
                      alt=""
                    />
                  </p>
                  <p style="text-align: center; line-height: 0.5rem">
                    高企认定满分共100分，70分以上为通过。贵公司本次评估得分<span
                      style="color: #d53c3e; font-size: 0.32rem"
                      >{{ totalScore }}分</span
                    >
                  </p>
                  <table border="1" style="margin-top: 0.3rem">
                    <tr v-for="(item, idx) of report.Object.scores" :key="idx">
                      <td>{{ item.name }}</td>
                      <td>{{ item.score }}</td>
                    </tr>
                  </table>
                  <p
                    v-if="totalScore >= 70"
                    style="
                      line-height: 0.38rem;
                      margin-top: 0.3rem;
                      text-align: center;
                    "
                  >
                    <span style="color: #d53c3e"
                      >恭喜您！您申报的成功率非常高</span
                    >，赶快咨询专业的服务公司，立即申报吧！
                  </p>
                  <p
                    v-else
                    style="
                      line-height: 0.38rem;
                      margin-top: 0.3rem;
                      text-align: center;
                    "
                  >
                    有点小遗憾，离达标线
                    <span style="color: #d53c3e">还差一点</span
                    >，不要灰心，通过努力都是有机会的。点击这里可以咨询专业的服务机构对贵公司的实力进行提升。
                  </p>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2">
                  <p style="text-indent: 2em">
                    尊敬的{{report.companyName}}，根据国家《高新技术企业认定管理办法》的评分标准，结合权威机构提供的大数据，系统对贵公司的相关数据进行了分析并作出评估，评估结果如下，敬请参考：
                  </p>
                  <p style="text-align: center; margin: 0.25rem 0 0.5rem">
                    <img
                  v-if="directSuccess"
                    style="width: 2.28rem"
                    :src="require('../../assets/success1.png')"
                    alt=""
                  />
                  <img
                  v-else
                    style="width: 3.28rem"
                    :src="require('../../assets/fail.png')"
                    alt=""
                  />
                  </p>
                  <p v-html="report.Object.reason" class="failP"></p>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <!-- <van-button
        style="width: 5.8rem; margin: 0.2rem 0.25rem 0.4rem"
        color="#d53c3e"
        @click="toServe"
        round
        >开始沟通服务机构</van-button
      > -->
    </div>
  </div>
</template>

<script>
import { createAssessment } from "@/api/request.js";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      fail: true,
      rightText: "完成",
      cCustomerAssessmentId: "",
      report: {
        Object:{
          ruanzhu: [],
          scores: [],
          zhuanli: []
        },
        title: '',
        companyName: '',
        time: ""
      },
      show: true,
      totalScore: "",
      directSuccess: false
    };
  },
  components: {},
  computed: { ...mapState(["companyName"]) },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.fromPath = from
    });
  },
  methods: {
    toHome() {
      this.$router.push("/assess");
    },
    getAssessment() {
      createAssessment(
        this.$qs.stringify({
          cCustomerAssessmentId: this.$route.query.customer,
          companyName: this.companyName,
        })
      ).then((res) => {
        this.show = false;
        if(res.data.data.Object.zhuanli == null) res.data.data.Object.zhuanli = []
        if(res.data.data.Object.scores == null) res.data.data.Object.scores = []
        if(res.data.data.Object.ruanzhu == null) res.data.data.Object.ruanzhu = []
        this.report = res.data.data;
        if (res.data.data.Object.status == 0) {
          this.fail = false;
          return;
        }
        else if(res.data.data.Object.status == 2) {
          this.fail = false
          this.directSuccess = true
          return 
        }
        let total = 0;
        res.data.data.Object.scores.forEach((item) => {
          total = total + item.score;
        });
        this.totalScore = total;
      });
    },
  },
  created() {},
  mounted() {
    this.getAssessment();
  },
};
</script>

<style scoped>
</style>
<style lang="less" scoped>
.assessreport {
  height: 100%;
  // background: #fef8f8;
  .container {
    padding: 0.82rem 0 0;
    text-align: center;
    background: #f8f8f8;
    .top {
      height: 3.38rem;
      width: 100%;
      background: transparent;
      position: relative;
      overflow: hidden;
      .circle {
        width: 1000px;
        height: 1000px;
        border-radius: 50%;
        position: absolute;
        background: #d53c3e;
        left: 50%;
        bottom: 0.2rem;
        z-index: 0;
        margin-left: -500px;
      }
    }
    .tableWraper {
      margin: -3.1rem 0.24rem 0;
      position: relative;
      .tableCon {
        background: #fff;
        width: 100%;
        padding: 0.34rem;
        border-radius: 0.1rem;
        table {
          width: 100%;
          tr {
            th {
              padding: 0.3rem;
              text-align: center;
              font-size: 0.3rem;
            }
            td {
              padding: 0.26rem;
              font-size: 0.24rem;
              line-height: 0.38rem;
              .scrollWrap {
                margin-top: 0.3rem;
                height: 4rem;
                table {
                  tr{
                    td{
                      padding: 0.1rem 0.26rem;
                    }
                  }
                  tbody {
                    display: block;
                    width: 100%;
                    height: 3rem;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                  }
                  ::-webkit-scrollbar {
                    width: 4px;
                    background-color: transparent;
                  }

                  ::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background: #b8b7b7;
                  }
                }
              }
              p {
                line-height: 0.38rem;
              }
              .failP {
                text-align: center;
                font-size: .28rem;
                span {
                  // color: #802426;
                  // font-size: 0.3rem;
                }
              }
            }
          }
        }
      }
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>