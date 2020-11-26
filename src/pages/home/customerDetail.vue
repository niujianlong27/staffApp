<template>
  <div class="customerDetail">
    <page-nav :title="'客户详情'"></page-nav>
    <main>
      <div class="imgdiv">
        <span class="textLeft">￥ <span> 3422</span></span>
        <span class="textRight">
        <img height="100%" src="../../assets/touxiang.png" alt="">
      </span>
      </div>
      <div class="line" id="line" :style="{width: '335px', height: '260px',margin: '10px auto 0'}"></div>

      <section>
        <p>此客户的订单（截止本月16日）</p>
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
        <van-cell center title="产品名称" value="+¥299.00" label="2020-07-08" />
      </section>
    </main>


  </div>

</template>

<script>
  import {Cell} from 'vant';
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import pageNav from '../../components/pageNav'

  export default {
    name: "customerDetail",
    components: {
      pageNav,
      [Cell.name]: Cell,
    },
    data() {
      return {}
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
            text: '客户消费曲线图（截止本月16日)',
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
            data: ['1', '2', '3', '4', '5', '6','7'],
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
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        })
      }
    },
    mounted() {
      this.drawLine()
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
    section{
      >p{
        @include  sc(14px,#8094BD)
      }
      /deep/ .van-cell{
        background-color: #1A202E;
      }
      .van-cell__title span{
        color: #ffffff;
      }
    }
  }

  .imgdiv {
    margin: 10px 0;
    display: flex;
    >span {
      height: 50px;
      line-height: 50px;
      flex: 1;
      &:first-child{
        font-size: 25px;
        span{
          line-height: 50px;
          font-size: 30px;
        }
      }
    }
  }
</style>
