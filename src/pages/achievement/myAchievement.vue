<template>
  <div class="myAchievement">
    <nav>
      <span class="left">总销售额度</span>
      <span @click.stop="rank" class="right">业绩排行</span>
    </nav>
    <main>
      <div>
        <p>￥ <span>8391.00</span></p>
        <span>奖励：¥200.00</span>
      </div>
      <section>
        <p>销售汇总</p>
        <div @click.stop="viewSales">
          <span class="left">鱼类</span>
          <span class="right">¥2,893.81</span>
        </div>
        <div>
          <span class="left">鱼类</span>
          <span class="right">¥2,893.81</span>
        </div>
      </section>
      <section>
        <p>区域汇总</p>
        <div>
          <span class="left">武汉市</span>
          <span class="right">¥2,893.81</span>
        </div>
        <div>
          <span class="left">荆州市</span>
          <span class="right">¥2,893.81</span>
        </div>
      </section>

    </main>

    <foot></foot>
  </div>
</template>

<script>
  import foot from '../../components/foot';

  export default {
    name: "myAchievement",
    components: {
      foot
    },

    data() {
      return {}
    },
    methods: {
      rank() {
        this.$router.push('/myRanking')
      },
      viewSales() {
        this.$router.push('/viewSales')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .myAchievement {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
    nav {
      margin: 20px 0;
      font-size: 16px;
      overflow: hidden;
      line-height: 30px;
    }
    main {
      background-color: #111622;
    }
    main > div {
      text-align: center;
      p {
        margin: 12px 0;
        font-size: 25px;
        span {
          font-size: 32px;
        }
      }
      > span {
        padding: 10px 20px;
        background: #1A202E;
        border-radius: 20px;
        color: #ffffff;
        font-size: 12px;
      }
    }
    section > p {
      margin: 0;
      padding: 16px 0;
      text-align: left;
      @include sc(16px, #8094BD);
    }
    section > div {
      overflow: hidden;
      padding: 23px 20px;
      background-color: #1A202E;
      border-top: 1px solid #e3e3e3;
      &:nth-of-type(1) {
        border-color: #0078FF
      }
    }

  }


</style>
