<template>
  <div class="customerDetail">
    <page-nav :title="'客户消费详情'"></page-nav>
    <main>
      <div class="imgdiv">
        <span class="textLeft">￥ <span> 3422</span></span>
        <span class="textRight">
        <img height="100%" src="../../assets/touxiang.png" alt="">
      </span>
      </div>
      <div class="line" id="line" :style="{width: '335px', height: '260px',margin: '10px auto 0'}"></div>

      <section>
        <p>此客户的订单（截止本月{{Day}}日）</p>


        <template v-if="orderList.length > 0">
          <template v-for="data in orderList">
            <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
            <!--<van-cell center title="产品名称" value="+¥299.00" label="2020-07-08"/>-->
          </template>
        </template>
        <template v-else>
          <van-empty description="暂无数据"/>
        </template>
      </section>
    </main>


  </div>

</template>

<script>
  import {Cell, Empty} from 'vant';
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import pageNav from '../../components/pageNav'

  export default {
    name: "customerDetail",
    components: {
      pageNav,
      [Cell.name]: Cell,
      [Empty.name]: Empty,
    },
    data() {
      return {
        orderList: [],
        Day: '',  // 日期
      }
    },
    methods: {
      myRank(index) {
        this.active = index
      },
      drawLine() {
        // 为charts选定父容器并初始化charts画布
        let myChart = this.$echarts.init(document.getElementById('line'), 'dark');
        // 为图表添加数据
        myChart.setOption({
          title: {
            text: `客户消费曲线图（截止本月${this.Day}日)`,
            textStyle: {
              fontSize: 14,
              fontWeight: 600
            }
          },
          tooltip: {
            trigger: 'axis',
          },
          backgroundColor: '#111622',
          color: ["#8094BD"],
          grid: {show: true, left: 60},
          xAxis: {
            type: 'category',
            data: [1, 2],
            axisLine: {
              lineStyle: {color: '#8094BD'}
            },
            axisTick: {alignWithLabel: true}
          },
          yAxis: {
            name: '元',
            type: 'value',
            axisLine: {
              lineStyle: {color: '#8094BD'}
            }
          },
          series: [{
            data: [820, 932],
            type: 'line'
          }]
        })
      },
      shopUser() {
        let date = new Date();
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate();

        this.Day = D;
        let params = {
          month: Y.toString() + M.toString(),
          idShopUser: this.$route.query.id
        };
        http.get(urls.shopUser, params).then(res => {
          if (res.success) {
            this.orderList = res.data.orderList || [];
          }

        }).catch(err => {

        })
      }
    },
    mounted() {
      this.drawLine()
    },
    created() {
      this.shopUser()
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  main {
    background-color: #111622;
    text-align: left;
    padding: 0 20px 30px;
    section {
      > p {
        @include sc(14px, #8094BD)
      }
      /deep/ .van-cell {
        background-color: #1A202E;
      }
      .van-cell__title span {
        color: #ffffff;
      }
    }
  }

  .imgdiv {
    margin: 10px 0;
    display: flex;
    > span {
      height: 50px;
      line-height: 50px;
      flex: 1;
      &:first-child {
        font-size: 25px;
        span {
          line-height: 50px;
          font-size: 30px;
        }
      }
    }
  }
</style>
