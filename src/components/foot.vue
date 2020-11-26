<template>
  <footer class="footer" v-if="hideshow">
    <van-tabbar inactive-color="#636F7F"  active-color="#fff"  v-model="value">
      <van-tabbar-item v-for="(item, index) in tabbars"
                       :key="item.name" :to="item.path">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant';
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "foot",
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
    },
    data() {
      return {
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hideshow: true, //显示或者隐藏footer
        value: 0,//当前选择的底部导航的索引
        tabbars: [
          {
            path: "/home",
            title: "客户",
            active: require("../assets/kh.png"),
            normal: require("../assets/nkh.png")
          },
          {
            path: "/myAchievement",
            title: "业绩",
            active: require("../assets/jx.png"),
            normal: require("../assets/njx.png")
          },
          {
            path: "/myMessage",
            title: "站内信",
            active: require("../assets/tz.png"),
            normal: require("../assets/ntz.png")
          },
          {
            path: "/personCenter",
            title: "工作报告",
            active: require("../assets/xz.png"),
            normal: require("../assets/nxz.png")
          }
        ]
      };
    },
    computed: {
      ...mapState(['active']),
    },
    methods: {},
    mounted() {
      this.value = this.active;
      window.onresize = () => {
        return (() => {
          this.showHeight = document.documentElement.clientHeight;
        })();
      };
    },
    activated() {
      this.value = this.active;
    },
    watch: {
      showHeight() {
        if (this.docmHeight > this.showHeight + 130) {
          this.hideshow = false
        } else {
          this.hideshow = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .footer{
    /deep/ .van-tabbar {
      background-color: #e4e4e4;
    }

    /deep/ .van-tabbar-item__icon img {
      height: 22px;
    }
  }

</style>
