import Vue from 'vue'
import axios from 'axios'
import {Toast} from 'vant'
Vue.use(Toast);

const devBaseUrl = 'https://qixianfeng.ave.cc/apis/';
const proBaseUrl = 'https://qixianfeng.ave.cc/apis/';
// const proBaseUrl = 'http://192.168.90.7:9527/';
let url;
process.env.NODE_ENV === 'development' ? url = devBaseUrl : url = proBaseUrl ;

const service = axios.create({
  baseURL: url,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

service.interceptors.request.use(config => {
  config.headers['token'] =   window.localStorage.getItem('token') || ''
  config.headers['MAC'] =   window.localStorage.getItem('mac') || ''
  return config
})
service.interceptors.response.use(responese => {
    return responese;
  },
  error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      Toast.fail('网络连接超时');
      return  // reject这个错误信息
    }
    if (error.message.includes('500')){
      Toast.fail('网络异常');
      return ; // reject这个错误信息
    }
    return Promise.reject(error);
  }
)
// 获取新闻内容
export function getJspaPolicyInfo(data) {
    return service({
      url: `appnews/jspaPolicy/getJspaPolicyInfo`,
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: data
    })
}
// 获取banner图
export function getBanner(criCode) {
  return service({
    url: `appnews/jspaPhoto/getBanner?criCode=${criCode}`,
    method: 'post',
  })
}
// 获取头像
export function getUserAvatar() {
  return service({
    url: `appnews/jspaPolicy/getUserAvatar`,
    method: 'post',
  })
}
// 获取新闻列表图
export function getNewsPhone(data) {
  return service({
    url: 'appnews/jspaPhoto/getNewsPhone',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}

// 获取新闻列表
export function getpolicy(data) {
  return service({
    url: 'appnews/jspaPolicy/getpolicy',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}

// 获取当前发布机构
export function getJspaJspaQuery(data) {
  return service({
    url: `appnews/jspaJspa/getJspaJspaQuery?criCode=${data}`,
    method: 'post',
  })
}
// 获取简报列表
export function getTbAllianceReport() {
  return service({
    url: `appnews/tbAllianceReport/getTbAllianceReport`,
    method: 'post',
  })
}
// 获取简报详情
export function getTbAllianceReportDetail(data) {
  return service({
    url: `appnews/tbAllianceReportDetail/getTbAllianceReportDetail?reportId=${data}`,
    method: 'post',
  })
}
// 搜索接口
export function getJspaPolicy(data) {
  return service({
    url: 'appnews/jspaPolicy/getJspaPolicy',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 获取下属区
export function getRegion(criCode) {
  return service({
    url: `appnews/jspaRegionInfo/getRegion?criCode=${criCode}`,
    method: 'post',
  })
}
// 获取上属城市
export function getSuperior(criCode) {
  return service({
    url: `appnews/jspaRegionInfo/getSuperior?criCode=${criCode}`,
    method: 'post',
  })
}
// 获取下属区
export function getJscodeOpen(criCode) {
  return service({
    url: `appnews/jspaJspa/getJscodeOpen?criCode=${criCode}`,
    method: 'post',
  })
}
// 获取企业评估列表
export function getMyAssessmentList(data) {
  return service({
    url: 'appauth/cCustomerAssessmentType/getMyAssessmentList',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 视频banner接口
export function getVideoBanner() {
  return service({
    url: `appvideo/cVideo/getVideoBanner`,
    method: 'post',
  })
}
// 视频接口
export function getVideoRadom() {
  return service({
    url: `appvideo/cVideo/getVideoRadom`,
    method: 'post',
  })
}
// 视频列表
export function getVideoList(data) {
  return service({
    url: 'appvideo/cVideo/getVideoList',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 视频播放
export function getVideo(id) {
  return service({
    url: `appvideo/cVideo/getVideo?id=${id}`,
    method: 'post',
  })
}
// 视频是否付费
export function getVideourl(id) {
  return service({
    url: `appvideo/cVideo/getVideourl?id=${id}`,
    method: 'post',
  })
}
// 保存视频观看时长
export function setVideoTime(data) {
  return service({
    url: `appvideo/cVideo/setVideoTime`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 创建视频订单
export function getVideoOrderinfo(id) {
  return service({
    url: `appvideo/cVideo/getVideoOrderinfo?id=${id}`,
    method: 'post',
  })
}
// 创建企业评估
export function createMyAssessment(data) {
  return service({
    url: 'appauth/cCustomerAssessment/createMyAssessment',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 问题列表
export function getMyQuestionList(id) {
  return service({
    url: `appauth/cCustomerAssessmentQuestion/getMyQuestionList?assessmentId=${id}`,
    method: 'post',
  })
}
// 获取问题
export function getMyQuestion(data) {
  return service({
    url: 'appauth/cCustomerAssessmentQuestion/getMyQuestion',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 提交我的回答
export function submitMyAnswer(data) {
  return service({
    url: 'appauth/cCustomerAssessmentQuestion/submitMyAnswer',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: data
  })
}
// 获取评估报告
export function myAssessInfo(id) {
  return service({
    url: `appauth/cCustomerAssessment/myAssessInfo?assessment=${id}`,
    method: 'post',
  })
}
// 获取评估报告2
export function myAssessInfoTwo(id) {
  return service({
    url: `appauth/cCustomerAssessment/myAssessInfoTwo?assessment=${id}`,
    method: 'post',
  })
}
// 提交评估公司，获取评估订单id
export function sendComplateName(data) {
  return service({
    url: 'appauth/cCustomerAssessment/sendAssessmentName',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data
  })
}
// 获取历史评估
export function getMyAssessmentComList(data) {
  return service({
    url: `appauth/cCustomerAssessment/getMyAssessmentList`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data
  })
}
// 支付宝视频支付
export function zfbPay(data) {
  return service({
    url: `apporder/OrderController/zxbTest`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data
  })
}
// 获取订单列表
export function getOrederList() {
  return service({
    url: `apporder/cCustomerOreder/getOrederList`,
    method: 'post',
  })
}
// 获取支付订单详情
export function getMyAssessmentInfo(id) {
  return service({
    url: `appauth/cCustomerAssessmentType/getMyAssessmentInfo?assessmentTypeId=${id}`,
    method: 'post',
  })
}
// 支付宝评估支付
export function zxbPayAssessment(data) {
  return service({
    url: `apporder/OrderController/zxbPayAssessment`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data
  })
}
// 支付完成后获取评测报告
export function createAssessment(data) {
  return service({
    url: `appauth/cCustomerAssessment/createAssessment`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data
  })
}
// 企业评估资格查询
export function MyQualifications(id) {
  return service({
    url: `appauth/cCustomerAssessment/MyQualifications?assessmentTypeId=${id}`,
    method: 'post',
  })
}