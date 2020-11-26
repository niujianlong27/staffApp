<template>
  <div class="person">
    <nav>
      <!--<span :class="{spanBorder:active == '0'}">周报</span>-->
      <!--<span :class="{spanBorder:active == '1'}">月报</span>-->
      <!--<span :class="{spanBorder:active == '2'}">我的报销单</span>-->

      <span @click="change(index)" v-for="(item,index) in title" :class="{spanBorder:active == index}">{{item}}</span>
      <span><van-icon @click.stop="toPath" size="20" name="add"/></span>
    </nav>
    <main>
      <section v-if="active == 0">
        <div @click.stop="details" class="list">
          <p><span class="left">周报</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
        <div class="list">
          <p><span class="left">周报</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
      </section>

      <section v-else-if="active == 1">
        <div class="list">
          <p><span class="left">月报</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
        <div class="list">
          <p><span class="left">月报</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
      </section>

      <section v-else-if="active == 2">
        <div @click.stop="details" class="list">
          <p><span class="left">拜访客户</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
        <div class="list">
          <p><span class="left">拜访客户</span> <span class="right">¥5750</span></p>
          <p><span class="left">2020-08-08</span> <span class="right">未读</span></p>
        </div>
      </section>

    </main>
    <foot></foot>
  </div>
</template>

<script>
  import foot from '../../components/foot'
  import {Grid, GridItem, Image, Button, Cell, Toast, Popup, Icon} from 'vant';
  import {mapState, mapMutations} from 'vuex'
  import {setSessionStorage, getSessionStorage} from "../../config/Utils";
  import http from "../../utils/http";
  import urls from '../../utils/urls';


  export default {
    name: "personCenter",
    components: {
      [Popup.name]: Popup,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Image.name]: Image,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
      foot
    },
    data() {
      return {
        active: 0,
        title: ['周报', "月报", "我的报销单"]
      }
    },
    computed: {},
    methods: {
      change(index) { // 标题切换
        this.active = index;
      },
      toPath() {
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/myWeekly', query: {state: 'add'}});
            break;
          case  2:
            this.$router.push({path: '/myReimburse', query: {state: 'add'}});
            break
        }
      },
      details() { // 查看详情
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/myWeekly', query: {state: 'see'}});
            break;
          case  2:
            this.$router.push({path: '/myReimburse', query: {state: 'see'}});
            break
        }
      }
    },
    mounted() {
      getSessionStorage('active') && (this.active = Number(getSessionStorage('active')));
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .person {
    main {
      background-color: #111622;
    }
    padding: 0 20px;
    box-sizing: border-box;
    nav {
      display: flex;
      margin: 10px 0 20px;
      color: #DEE9FF;
      text-align: left;
      span {
        margin-right: 20px;
        padding: 5px 0;
        .van-icon {
          top: 2px;
          /*margin-left: 5px;*/
        }
      }
      .spanBorder {
        border-bottom: 2px solid #DEE9FF;
      }
    }
    .list {
      padding: 20px;
      border-top: 1px solid #0078FF;
      margin-top: 10px;
      background-color: #1A202E;
    }
    .list p {
      margin: 8px 0;
      overflow: hidden;
      &:first-child {
        font-size: 15px;
        @include sc(15px, #ffffff)
      }
      &:last-child {
        @include sc(13px, #6D778B)
      }
    }
  }

</style>
