<template>
  <div class="assessreport">
    <!-- <van-overlay :show="show">
  <div class="wrapper" >
    <van-loading size="24px" vertical>正在生成报告...</van-loading>
  </div>
</van-overlay> -->
    <van-nav-bar
      title="评估样本"
      :border="false"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="container">
      <div class="top">
        <div class="circle"></div>
      </div>
      <div class="tableWraper">
        <div class="tableCon">
          <table border="1">
            <tr>
              <th colspan="2">高新技术企业评估报告</th>
            </tr>
            <tr>
              <td align="center">安徽艾为云科技有限公司</td>
              <td align="center">2021-03-03 10:26</td>
            </tr>
            <tr>
              <td colspan="2">
                <p style="text-indent: 2em">
                  尊敬的艾为云科技有限公司，根据国家《高新技术企业认定管理办法》的评分标准，结合权威机构提供的大数据，系统对贵公司的相关数据进行了分析并作出评估，评估结果如下，敬请参考：
                </p>
                <div class="scrollWrap">
                  <table rules="all">
                    <tbody border="1">
                      <tr>
                        <td rowspan="14">发明专利</td>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="scrollWrap">
                  <table rules="all">
                    <tbody border="1">
                      <tr>
                        <td rowspan="14">软件著作权</td>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                      <tr>
                        <td>一种实体关系预测方法及装置</td>
                        <td>2018-12-12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p
                  style="font-size: 0.18rem; color: #ababab; margin-top: 0.2rem"
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
                    style="width: 3.28rem"
                    :src="require('../../assets/success.png')"
                    alt=""
                  />
                </p>
                <p style="text-align: center; line-height: 0.5rem">
                  高企认定满分共100分，70分以上为通过。贵公司本次评估得分<span
                    style="color: #d53c3e; font-size: 0.32rem"
                    >79分</span
                  >
                </p>
                <table border="1" style="margin-top: 0.3rem">
                  <tr>
                    <td>知识产权</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>科技成果转化</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>研究开发阻止管理水平</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>企业成长性</td>
                    <td>16</td>
                  </tr>
                </table>
                <p
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
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <van-button style="width: 5.8rem;margin: 0.2rem 0.25rem 0.4rem;" color="#d53c3e" @click="toServe" round>开始沟通服务机构</van-button> -->
    </div>
  </div>
</template>

<script>
import { myAssessInfo } from "@/api/request.js";
import { mapState } from 'vuex';
export default {
  name: "",
  data() {
    return {
      rightText: "完成",
    };
  },
  components: {},
  computed: {...mapState(['height'])},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.fromPath = from
    });
  },
  methods: {
    toHome() {},
    
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.assessreport {
  height: 100%;
  // background: #fef8f8;
  .container {
    padding: 0.84rem 0 0;
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
                table {
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
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    background: #b8b7b7;
                  }
                }
              }
              p {
                line-height: 0.38rem;
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