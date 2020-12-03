<template>
  <div class="myMessage">
    <nav class="textLeft">
      站内信
    </nav>
    <main>
      <template v-if="isLoding">
        <van-loading color="#1989fa" size="24px">数据加载中...</van-loading>
      </template>
      <template v-else>
        <template v-if="noticelists.length > 0">

          <template v-for="data in noticelists">
            <div><span class="left">你的报销申请已被查看！</span><span class="right">2020-08-09</span></div>
          </template>
        </template>
        <template v-else>
          <van-empty description="暂无数据"/>
        </template>
      </template>


    </main>
    <foot></foot>

  </div>
</template>

<script>
  import pageNav from '../../components/pageNav'
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import foot from '../../components/foot';
  import {List, Empty, Toast, Loading} from 'vant';

  export default {
    name: "myMessage",
    components: {
      pageNav, foot,
      [Loading.name]: Loading,
      [Empty.name]: Empty,
      [List.name]: List,
      Toast
    },
    data() {
      return {
        noticelists: [], // 消息列表
        isLoding: false, // 查询状态
      }
    },
    methods: {
      getNotice() {
        http.get(urls.noticeQueryByUser, {}).then(res => {
          this.isLoding = false;
          if (res.success) {
            this.noticelists = res.data;
          }

        }).catch(err => {

        })
      },
      noticeById() {
        let id = '';
        http.post(`${urls.noticeById}/${id}`, {}).then(res => {
          if (res.success) {
          }

        }).catch(err => {

        })
      }
    },
    mounted() {
      this.isLoding = true;
      this.getNotice()
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .myMessage {
    box-sizing: border-box;
    padding: 0 20px;
    nav {
      margin: 20px 0;
      @include sc(16px, #DEE9FF)
    }
    main {
      background-color: #111622;
    }
    main > div {
      background: #2B354C;
      overflow: hidden;
      padding: 20px 15px;
      border-radius: 5px;
      span {
        display: inline-block;
        font-size: 12px;
        &:first-child {
          text-align: left;
          width: 70%;
          color: #F2F2F2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

        }
        &:last-child {
          color: #8094BD;
        }
      }
    }
    .van-empty {
      background-color: #111622;
    }
  }

</style>
