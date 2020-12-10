<template>
  <div class="person">
    <nav>

      <span @click="change(index)" v-for="(item,index) in title" :class="{spanBorder:active == index}">{{item}}</span>
      <span><van-icon @click.stop="toPath" size="20" name="add"/></span>
    </nav>
    <main>
      <section v-if="active == 0">
        <template v-for="item in workreportList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">周报</span> <span class="right">¥ {{item.planAmt}}</span></p>
            <p><span class="left">{{item.startDate | setDate}} - {{item.endDate | setDate}}</span> <span class="right">{{item.isDefault ? '已读' : ' 未读'}}</span>
            </p>
          </div>
        </template>

      </section>

      <section v-else-if="active == 1">

        <template v-for="item in workreportList">
          <div @click.stop="details(item)" class="list">
            <p><span class="left">月报</span> <span class="right">¥ {{item.planAmt}}</span></p>
            <p><span class="left">{{item.startDate | setDate}} - {{item.endDate | setDate}}</span> <span class="right">{{item.isDefault ? '已读' : ' 未读'}}</span>
            </p>

          </div>
        </template>

      </section>

      <section v-else-if="active == 2">

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
  </div>
</template>

<script>
  import foot from '../../components/foot'
  import {Grid, GridItem, Image, Button, Cell, Toast, Popup, Icon, Empty} from 'vant';
  import {mapState, mapMutations} from 'vuex'
  import {setSessionStorage, getSessionStorage} from "../../config/Utils";
  import http from "../../utils/http";
  import urls from '../../utils/urls';


  export default {
    name: "personCenter",
    components: {
      [Empty.name]: Empty,
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
        title: ['周报', "月报", "我的报销单"],
        seaccountList: [], // 报销数据
        workreportList: [],// 周报 、月报
      }
    },
    computed: {},
    methods: {
      change(index) { // 标题切换
        // console.log(index)
        this.workreportList = [];
        this.active = index;
        switch (index) {
          case 0:
            this.workreport(1); // 周报
            break;
          case 1:
            this.workreport(2); // 月报
            break;
          case 2:
            this.seaccount(); // 报销单
            break;
        }

      },
      toPath() {
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/myWeekly', query: {state: 'add'}});
            break;
          case  1:
            this.$router.push({path: '/monthlyReport', query: {state: 'add'}});
            break;
          case  2:
            this.$router.push({path: '/myReimburse', query: {state: 'add'}});
            break
        }
      },
      details(item) { // 查看详情
        setSessionStorage('active', this.active);
        switch (this.active) {
          case  0:
            this.$router.push({path: '/myWeekly', query: {state: 'see',data:item}});
            break;
          case  1:
            this.$router.push({path: '/monthlyReport', query: {state: 'see',data:item}});
            break;
          case  2:
            this.$router.push({path: '/myReimburse', query: {state: 'see',data:item}});
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
      workreport(type) {
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
