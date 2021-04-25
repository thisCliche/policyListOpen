<template>
  <div class="city-search">
    <div class="search">
      <input class="search-input" type="text" v-model="keyword" placeholder="请输入城市名或拼音">
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: "CitySearch",
  props:{
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  methods: {
  },
  computed: {
    hasNoData() {
      return !this.list.length
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword){
        this.list = []
        this.$emit('searchRes', this.list, false)
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities){
          this.cities[i].forEach((value) => {
            if (value.spell.includes(this.keyword) || value.name.includes(this.keyword) ){
              result.push(value)
            }
          });
        }
        this.$emit('searchRes', result, true)
      },100)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/constant.less";
  .search{
    height: .72rem;
    padding: 0 .1rem;
    background: @mainColor;
    .search-input {
      height: .62rem;
      line-height: .62rem;
      width: 100%;
      padding: 0 .1rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
      }
  }
  .search-content{
    overflow: hidden;
    position: absolute;
    z-index: 999;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom :0;
    background: #eeeeee;
    .search-item  {
      padding-left: .2rem;
      line-height: .62rem;
      background: #fff;
      color: #666;
      }
  }
</style>