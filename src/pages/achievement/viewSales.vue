<template>
  <div class="viewSales">
    <page-nav :title="'查看销售额'"></page-nav>
    <main>
      <div class="imgdiv">
        <span class="textLeft">￥ <span> 3422</span></span>
        <span class="textRight">
        <img height="100%" src="../../assets/touxiang.png" alt="">
      </span>
      </div>
      <div class="line" id="line" :style="{width: '335px', height: '260px',margin: '10px auto 0'}"></div>
      <div class="scroll">
        <van-grid class="grid" :gutter="8" :border="false" :column-num="20">
          <van-grid-item v-for="(item,index) in 3" :key="index">
            <span class="title">七月份</span>
            <span class="brief-in">￥ 4433</span>
            <span class="brief">0.022534</span>
          </van-grid-item>
        </van-grid>
      </div>
      <section>
        <p>我的客户消费情况（截止本月16日）</p>
        <div @click.stop="details" class="kehu" v-for="(item) in rankList">
        <div>
        <img style="height: 50px"
        src="../../assets/touxiang.png" alt="">
        </div>
        <div>
        <p><span class="left">{{item.nick_name}}</span> <span class="right">当月： +￥100</span></p>
        <p><span class="left">1928192871</span></p>
        </div>
        </div>
        <!--require('../../assets/touxiang.png')-->

      </section>

    </main>

  </div>
</template>

<script>
  import {Cell, GridItem, Icon,Grid} from 'vant';
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import pageNav from '../../components/pageNav'

  export default {
    name: "viewSales",
    components: {
      pageNav,
      [Cell.name]: Cell,
      [Grid.name]: Grid,
      [Icon.name]: Icon,
      [GridItem.name]: GridItem,
    },
    data() {
      return {
        rankList: [
          {rank_no: 1, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "赵"},
          {rank_no: 2, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "钱"},
          {rank_no: 3, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "孙"},
          {rank_no: 4, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "李"},
          {rank_no: 5, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "周"},
          {rank_no: 6, rebate_amount_total: 200.0, id_user: 8, is_self: 0, nick_name: "吴"},
        ],
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
            text: '业绩曲线图（截止本月16日）',
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
            data: ['1', '2', '3', '4', '5', '6', '7'],
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
    padding: 0 20px 50px;
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
  }

  .scroll {
    text-align: left;
    overflow-x: scroll;
    .grid {
      min-width: 715px !important;
      span {
        display: block;
        width: 210px;
        margin: 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /deep/ .van-grid-item__content {
        background-color: #1C2333;
        border-top: 1px solid #3190e8;
      }
    }

    .title {
      @include sc(17px, #576C9C);
      font-weight: 600;
      margin-bottom: 40px !important;
    }
    .brief-in {
      @include sc(20px, #fff);
    }
    .brief {
      @include sc(12px, #6D778B);
      padding-left: 10px;
      box-sizing: border-box;
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
