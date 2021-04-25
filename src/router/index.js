import Vue from 'vue'
import VueRouter from 'vue-router'

const Index =() => import(/* webpackChunkName: "home_welcome" */ '../views/Index.vue')

const Home = () => import(/* webpackChunkName: "home_welcome" */ '../views/home/Home.vue')
const Detail = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/home/Detail.vue')
const BannerDetail = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/home/BannerDetail.vue')
const Search = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/search/Search.vue')
const Location = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/search/Location.vue')
const LocationTemp = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/search/LocationTemp.vue')
const OrderList = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/home/OrderList.vue')

const Video = () => import(/* webpackChunkName: "video_welcome" */ '../views/video/Video.vue')
const VideoColumn = () => import(/* webpackChunkName: "video_welcome" */ '../views/video/VideoColumn.vue')
const VideoCon = () => import(/* webpackChunkName: "video_welcome" */ '../views/video/VideoCon.vue')

const Assess = () => import(/* webpackChunkName: "assess_welcome" */ '../views/assess/Assess.vue')
const AssessReport = () => import(/* webpackChunkName: "assess_welcome" */ '../views/assess/AssessReport.vue')
const AssessReportTwo = () => import(/* webpackChunkName: "assess_welcome" */ '../views/assess/AssessReportTwo.vue')
const AssessReportSample = () => import(/* webpackChunkName: "assess_welcome" */ '../views/assess/AssessReportSample.vue')
const AssessComplete = () => import(/* webpackChunkName: "assess_welcome" */ '../views/assess/AssessComplete.vue')



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: Index,
    children:[{
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
          path: '/video',
          component: Video
    },
    {
          path: '/assess',
          component: Assess
    },
  ]
  },
  {
    path: '/videocon/:id',
    component: VideoCon
  },
  {
    path: '/videocolumn',
    component: VideoColumn
  },
  {
    path: '/assessreport',
    component: AssessReport
  },
  {
    path: '/assessreporttwo',
    component: AssessReportTwo
  },
  {
    path: '/assessreportsample',
    component: AssessReportSample
  },
  {
    path: '/assesscomplete',
    component: AssessComplete
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/bannerdetail',
    name: 'BannerDetail',
    component: BannerDetail
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList
  },
  
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/location',
    component: Location,
  },
  {
    path: '/locationtemp',
    component: LocationTemp,
  },
  
  
]

const router = new VueRouter({
  routes,
  // 当切换路由时，滚动到顶部位置
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default router
