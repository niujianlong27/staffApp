<template>
  <div class="myRanking">
    <page-nav :title="'业绩排行'"></page-nav>

    <main id="main">
      <div>
        <span class="left">我的排名：12</span>
        <span class="right">
      <span @click.stop="getRank(0,'month')" :class="{bgColor:active == 0}">月排行</span>
      <span @click.stop="getRank(1,'year')" :class="{bgColor:active == 1}">年排行</span>
      </span>
      </div>
      <section>
        <div class="kehu" v-for="(item,index) in rankList">
          <div>
            <template v-if="index <= 2">
              <img style="height: 40px;position: relative;top: 9px;"
                   :src="imgs[index].img" alt="">
            </template>
            <template v-else>
              <span class="index">{{index + 1}}</span>
            </template>
          </div>
          <div>
            <p><span class="left">李四</span> <span class="right">¥ {{item.amount}}</span></p>
            <p><span class="left">截止到 {{item.lastRecordTime | setDate}}</span> <span class="right">330单</span></p>
          </div>
        </div>
      </section>

    </main>
  </div>

</template>

<script>
  import pageNav from '../../components/pageNav'
  import urls from '../../utils/urls';
  import http from '../../utils/http';

  export default {
    name: "myRanking",
    components: {
      pageNav
    },

    data() {
      return {
        active: 0,
        rankList: [
          {rank_no: 1, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "赵"},
          {rank_no: 2, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "钱"},
          {rank_no: 3, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "孙"},
          {rank_no: 4, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "李"},
        ],
        imgs: [
          {
            img: require('../../assets/no1.png'),
          },
          {
            img: require('../../assets/no2.png'),
          },
          {
            img: require('../../assets/no3.png'),
          }
        ],
        category: {}, // 销售汇总
        area: {}, // 区域汇总
      }
    },
    methods: {


      getRank(index, type) {  // 查询排名
        this.active = index;
        http.get(`${urls.rankType}/${type}`, {}).then(res => {
          if (res.success){
            this.rankList = res.data[type];
          }

        }).catch(err => {

        })
      }
    },
    mounted() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate();
      console.log(`${Y}-${M}-${D}`);
      this.getRank(0, 'month')
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .myRanking {
    main {
      background-color: #111622;

      padding: 10px 20px 0;
      > div {
        padding: 10px 0;
        overflow: hidden;
        font-size: 16px;
        .right span {
          padding: 5px 15px;
          border: .5px solid silver;
          border-radius: 20px;
          &:first-child {
            margin-right: 8px;
          }
        }
        .bgColor {
          background-color: #3E475A;
          border: none !important;
        }

      }
    }
    .kehu {
      display: flex;
      padding: 15px 0;
      background-color: #1A202E;
      border-top: 1px solid #0078FF;
      margin-top: 10px;
      > div {
        p {
          margin: 8px 0;
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
          padding: 0 8px;
        }
      }
      .index {
        text-align: center;
        font-size: 35px;
        line-height: 65px;
      }
    }
  }
</style>
