<template>
  <div class="home">
    <nav>
      <span class="left">我的客户  <van-icon @click.stop="toPath" size="20" name="add"/></span>
      <span @click.stop="show = true" class="right">筛选</span>
    </nav>
    <main>
      <p>我的客户消费情况（截止本月16日）</p>

      <section>
        <div  @click.stop="details" class="kehu" v-for="(item) in rankList">
          <div>
            <img style="height: 50px"
                 src="../../assets/touxiang.png" alt="">
          </div>
          <div>
            <p><span class="left">{{item.nick_name}}</span> <span class="right">当月： +￥100</span></p>
            <p><span class="left">1928192871</span> <span class="right">累计： ￥128391</span></p>
          </div>
        </div>
      </section>

    </main>

    <van-popup closeable
               close-icon="clear"
               position="top" :style="{ height: '43%' }" v-model="show">
      <h3>客户身份</h3>
      <div>
        <van-grid :gutter="10" :border="false" :column-num="3">
          <van-grid-item :class="{areaIndex :idIndex == index}" @click.stop="idIndex = index"
                         v-for="(item,index) in type" :key="item">
            {{item}}
          </van-grid-item>
        </van-grid>
      </div>

      <h3>我的区域</h3>
      <div>
        <van-grid :gutter="10" :border="false" :column-num="3">
          <van-grid-item :class="{areaIndex :areaIndex == index}" @click.stop="areaIndex = index"
                         v-for="(item,index) in type"
                         :key="item">
            {{item}}
          </van-grid-item>
        </van-grid>
      </div>

      <van-button color="#00133A" block type="info" native-type="submit">
        确认选择
      </van-button>
    </van-popup>

    <foot></foot>
  </div>

</template>

<script>
  import {Popup, Notify, Icon, Grid, GridItem, Button} from 'vant';
  import foot from '../../components/foot';
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      foot,
      [Icon.name]: Icon,
      [Grid.name]: Grid,
      [Popup.name]: Popup,
      [Notify.name]: Notify,
      [Button.name]: Button,
      [GridItem.name]: GridItem,
    },
    data() {
      return {
        show: false,// 弹出层
        idIndex: null, // 身份索引
        areaIndex: null,// 区域索引
        rankList: [
          {rank_no: 1, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "赵"},
          {rank_no: 2, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "钱"},
          {rank_no: 3, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "孙"},
          {rank_no: 4, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "李"},
          {rank_no: 5, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "周"},
          {rank_no: 6, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "吴"},
        ],
        type: ['酒店', '批发', '乡厨']
      }
    },
    methods: {
      toPath() {
        this.$router.push('/addCustomer')
      },
      details() {
        this.$router.push('/customerDetail')
      },
    }

  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .home {
    text-align: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #DEE9FF;
    padding: 0 20px;
    nav {
      margin: 20px 0;
      font-size: 16px;
      overflow: hidden;
      line-height: 30px;
      .van-icon {
        top: 6px;
        margin-left: 5px;
      }
    }
    main {
      background-color: #111622;
      margin-top: 10px;
      > P {
        @include sc(15px, #8094BD)
      }
    }
    .kehu {
      display: flex;
      padding: 5px 0;
      > div {
        p {
          margin: 5px 0;
          overflow: hidden;
          &:first-child {
            font-size: 15px;
          }
          &:last-child {
            @include sc(12px, #6D778B)
          }
        }
        &:first-child {
          flex: 1;
        }
        &:last-child {
          flex: 4;
          border-bottom: 0.5px solid #F5F5F5;
        }
      }
    }
    /deep/ .van-popup {
      box-sizing: border-box;
      padding:10px 30px;
      background-color: #2B354C;
      /deep/ .van-grid-item__content {
        background: #8A919F;
        color: #ffffff;
        border-radius: 3px;
        padding: 8px;
      }
      .van-button {
        margin-top: 40px;
      }
    }
    .areaIndex {
      /deep/ .van-grid-item__content {
        background: #00133A;
      }

    }
  }


</style>
