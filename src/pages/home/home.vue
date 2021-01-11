<template>
  <div class="home">
    <nav>
      <span class="left">我的客户  <van-icon @click.stop="toPath('/addCustomer')" size="20" name="add"/></span>
      <span @click.stop="show = true" class="right">筛选</span>
    </nav>
    <main>
      <p>我的客户消费情况（截止本月{{nowDay}}日）</p>

      <section>
        <div @click.stop="toPath('/customerDetail',item.id)" class="kehu" v-for="(item) in customerList">
          <div>
            <img style="height: 50px"
                 src="../../assets/touxiang.png" alt="">
          </div>
          <div>
            <p><span class="left">{{item.nick_name}}</span> <span class="right">当月： +￥{{item.monthprice}}</span></p>
            <p><span class="left">{{item.mobile}}</span> <span class="right">累计： ￥{{item.totalprice}}</span></p>
          </div>
        </div>
      </section>

    </main>

    <van-popup closeable
               close-icon="clear"
               position="top" :style="{ height: '43%' }" v-model="show">
      <h3>客户身份</h3>
      <div>
        <van-grid :gutter="10" :border="false" :column-num="4">
          <van-grid-item :class="{areaIndex :idIndex == index}" @click.stop="idIndex = index"
                         v-for="(item,index) in type" :key="item">
            {{item}}
          </van-grid-item>
        </van-grid>
      </div>

      <h3>我的区域</h3>
      <div>
        <van-field
          readonly
          clickable
          @clear
          name="area"
          v-model="areaName"
          label="区域"
          placeholder="请选择区域"
          @click="showPicker = true"
          :error="false"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-area @cancel="showPicker = false" @confirm="pickConfirm($event)" title="标题"
                    :area-list="areaList"
                    :columns-num="3"/>
        </van-popup>

      </div>

      <van-button @click="Submit" color="#00133A" block type="info">
        确认选择
      </van-button>
    </van-popup>

    <foot></foot>
  </div>

</template>

<script>
  import {Popup, Notify, Field, Icon, Area, Grid, GridItem, Button} from 'vant';
  import foot from '../../components/foot';
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import {mapState, mapActions} from 'vuex'
  import areaList from '../../../static/Area'

  export default {
    components: {
      foot,
      [Area.name]: Area,
      [Field.name]: Field,
      [Icon.name]: Icon,
      [Grid.name]: Grid,
      [Popup.name]: Popup,
      [Notify.name]: Notify,
      [Button.name]: Button,
      [GridItem.name]: GridItem,
    },
    data() {
      return {
        areaName: '',  // 区域名称
        showPicker: false, // 显示选择区域
        show: false,// 弹出层
        idIndex: null, // 身份索引
        areaIndex: null,// 区域索引
        customerList: [],// 客户集合
        areaList: areaList,
        type: ['酒店', '批发', '乡厨', '消费者'],
        nowDay: '', // 当前日期
      }
    },
    methods: {

      toPath(url, data) {
        if (data) {
          this.$router.push({path: url, query: {id: data}}); //跳转地址设置
          return
        }
        this.$router.push(url)
      },

      pickConfirm(values) {
        this.areaName = `${values[0].name}${values[1].name}${values[2].name}`;
        this.showPicker = false;
      },

      getInfoByStaff(params) { // 查询客户
        http.get(urls.getInfoByStaff, params).then(res => {
          if (res.success) {
            this.customerList = res.data
          }

        }).catch(err => {

        })
      },

      Submit() { // 筛选
        let params = {
          area: this.areaName,
          type: this.idIndex + 1,
        };
        this.show = false;
        this.getInfoByStaff(params);
      }


    },
    created() {
      let date = new Date();
      let D = date.getDate();
      this.nowDay = D;
      this.getInfoByStaff({})
    },
    mounted() {

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
    > /deep/ .van-popup {
      box-sizing: border-box;
      padding: 10px 30px;
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
    /deep/ .van-field__label {
      color: white;
    }
    /deep/ .van-field__control {
      color: white;
    }
    .van-cell {
      background-color: #2B354C;
    }
    .areaIndex {
      /deep/ .van-grid-item__content {
        background: #00133A;
      }

    }
  }


</style>
