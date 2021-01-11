<template>
  <div class="person">
    <nav>

      <span @click="change(index)" v-for="(item,index) in title" :class="{spanBorder:active == index}">{{item}}</span>
      <span><van-icon @click.stop="toPath" size="20" name="add"/></span>
      <span class="right">
        <van-icon @click.stop="showPopup" size="20" name="setting-o"/>
      </span>
    </nav>
    <main>
      <section v-if="active == 0">
        <template v-for="item in workreportList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">日报</span> <span class="right">¥ {{item.planAmt}}</span></p>
            <p><span class="left">{{item.startDate | setDate}} - {{item.endDate | setDate}}</span> <span class="right">{{item.isDefault ? '已读' : ' 未读'}}</span>
            </p>
          </div>
        </template>

      </section>
      <section v-else-if="active == 1">
        <template v-for="item in workreportList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">周报</span> <span class="right">¥ {{item.planAmt}}</span></p>
            <p><span class="left">{{item.startDate | setDate}} - {{item.endDate | setDate}}</span> <span class="right">{{item.isDefault ? '已读' : ' 未读'}}</span>
            </p>
          </div>
        </template>

      </section>

      <section v-else-if="active == 2">

        <template v-for="item in workreportList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">月报</span> <span class="right">¥ {{item.planAmt}}</span></p>
            <p><span class="left">{{item.startDate | setDate}} - {{item.endDate | setDate}}</span> <span class="right">{{item.isDefault ? '已读' : ' 未读'}}</span>
            </p>

          </div>
        </template>

      </section>

      <section v-else-if="active == 3">

        <!--<template v-if="seaccountList.length > 0">-->
        <template v-for="item in seaccountList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">{{item.title}}</span> <span class="right">¥ {{item.amount}}</span></p>
            <p><span class="left">{{item.sedate}}</span> <span class="right">{{item.statusName}}</span></p>
          </div>
        </template>
        <!--</template>-->
        <!--<template v-else>-->
        <!--<van-empty description="暂无数据"/>-->
        <!--</template>-->
      </section>

    </main>
    <foot></foot>
    <van-popup position="right" :style="{ height: '100%',width:'35%' }" v-model="show">
      <p class="signOut"><span @click="signOut">退出登录</span></p>
    </van-popup>

    <van-popup class="popup" v-model="show2">
      <p style="text-align: center;font-size: 18px">确认登出？</p>
      <van-button @click.stop="cancel()" type="primary">取消</van-button>
      <van-button @click.stop="loginOut()" type="info">确认</van-button>
    </van-popup>


  </div>
</template>

<script>
  import foot from '../../components/foot'
  import {Grid, GridItem, Image, Button, Cell, Toast, Popup, Icon, Empty} from 'vant';
  import {mapState, mapMutations} from 'vuex'
  import {setSessionStorage, removelocalStorage,getSessionStorage} from "../../config/Utils";
  import http from "../../utils/http";
  import urls from '../../utils/urls';


  export default {
    name: "personCenter",
    components: {
      [Empty.name]: Empty,
      [Popup.name]: Popup,
      [Button.name]: Button,

      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Image.name]: Image,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
      foot
    },
    data() {
      return {
        show: false, // 退出控制
        show2: false, // 确认退出
        active: 0,
        title: ['日报', '周报', "月报", "我的报销单"],
        seaccountList: [], // 报销数据
        workreportList: [],// 周报 、月报
      }
    },
    computed: {},
    methods: {
      signOut() {
        this.show2 = true;
      },

      showPopup() { // 点击设置按钮
        this.show = true;
      },

      cancel() {
        this.show = false;
        this.show2 = false;
      },
      loginOut() { //退出
        http.post(urls.logout, {}).then(res => {
          if (res.success) {
            console.log()
            removelocalStorage("token");
            removelocalStorage("userInfo");
            Toast.success('退出成功！');
            this.$router.push('/signIn')
          }

        }).catch(err => {

        })

      },

      change(index) { // 标题切换
        this.workreportList = [];
        this.active = index;
        switch (index) {
          case 0:
            this.workreport(3); // 日报
            break;
          case 1:
            this.workreport(1); // 周报
            break;
          case 2:
            this.workreport(2); // 月报
            break;
          case 3:
            this.seaccount(); // 报销单
            break;
        }

      },
      toPath() {
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/dayReport', query: {state: 'add'}});
            break;
          case  1:
            this.$router.push({path: '/myWeekly', query: {state: 'add'}});
            break;
          case  2:
            this.$router.push({path: '/monthlyReport', query: {state: 'add'}});
            break;
          case  3:
            this.$router.push({path: '/myReimburse', query: {state: 'add'}});
            break
        }
      },
      details(item) { // 查看详情
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/dayReport', query: {state: 'see', data: item}});
            break;
          case  1:
            this.$router.push({path: '/myWeekly', query: {state: 'see', data: item}});
            break;
          case  2:
            this.$router.push({path: '/monthlyReport', query: {state: 'see', data: item}});
            break;
          case  3:
            this.$router.push({path: '/myReimburse', query: {state: 'see', data: item}});
            break
        }
      },
      seaccount() { // 查询报销单
        http.get(urls.seaccount, {}).then(res => {
          if (res.success) {
            this.seaccountList = res.data.records || []
          }
        }).catch(err => {

        })
      },
      workreport(type) { // 查询月报
        http.get(urls.workreport, {type: type}).then(res => {
          if (res.success) {
            this.workreportList = res.data.records || []
          }

        }).catch(err => {

        })
      }
    },
    mounted() {
      getSessionStorage('active') && (this.active = Number(getSessionStorage('active')));
      this.change(this.active)
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
    padding: 0 15px;
    box-sizing: border-box;
    nav {
      line-height: 35px;
      text-align: left;
      margin: 10px 0 20px;
      color: #DEE9FF;
      span {
        display: inline-block;
        margin-right: 20px;
        padding: 5px 0;
        .van-icon {
          top: 5px;
        }
      }
      .spanBorder {
        border-bottom: 2px solid #DEE9FF;
      }
      .right {
        margin: 0;
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

    .signOut {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #000;
    }
    .popup {
      width: 60%;
      padding: 10px;
      border-radius: 5px;
      p {
        text-align: left;
        padding: 0 5px;
        margin: 8px 0;
        @include sc(13px, #323233)
      }
      .van-button {
        margin-top: 10px;
        padding: 0 8px;
        @include wh(100px, 30px);
      }
    }

  }

</style>
