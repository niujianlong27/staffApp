<template>
  <div class="myReimburse">
    <page-nav :title="title"></page-nav>
    <main>

      <template v-if="state  == 'see'">
        <section>
          <p>报销事由：拜访客户</p>
          <p>报销金额：¥300</p>
          <p>报销时间：2020-08-09</p>
          <p>报销凭证</p>
        </section>
      </template>

      <template v-else>
        <van-form @submit="addReimburse" ref="form">
          <template v-for="item in fromData">
            <template v-if="item.type == 'text'">
              <van-field
                center
                :border="false"
                :error="false"
                :name="item.eName"
                :label="item.cName"
                v-model="item.value"
                :placeholder="item.placeholder"
                :rules="item.rule"
                :required="item.required"
              >
              </van-field>
            </template>

            <template v-if="item.type == 'uploader'">
              <van-field :border="false" :required="item.required" :name="item.eName" :rules="item.rule"
                         :label="item.cName">
                <template #input>
                  <van-uploader :after-read="afterRead(item)" :max-count="1" v-model="item.value"/>
                </template>
              </van-field>
            </template>
          </template>

          <div style="margin: 16px;">

            <van-button color="#2B354C" block type="info" native-type="submit">
              确认提交
            </van-button>
          </div>

        </van-form>
      </template>

    </main>
  </div>
</template>

<script>
  import pageNav from '../../components/pageNav'
  import {Form, Field, Button, Toast, Uploader} from 'vant';

  export default {
    name: "myReimburse",
    components: {
      pageNav,
      [Form.name]: Form,
      [Field.name]: Field,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Uploader.name]: Uploader,

    },
    data() {
      return {
        state: '',
        title: '', // 标题
        fromData: [
          {
            cName: '报销事由',
            eName: 'nikeName',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入报销事由',
            rule: [{required: true, message: '请输入报销事由'}]
          },
          {
            cName: '报销金额',
            eName: 'nikeName',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入报销金额',
            rule: [{required: true, message: '请输入报销金额'}]
          },
          {
            cName: '报销时间',
            eName: 'nikeName',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入报销时间',
            rule: [{required: true, message: '请输入报销时间'}]
          },

          {
            required: false,
            cName: '报销凭证',
            eName: 'idcard',
            type: 'uploader',
            value: [],
            placeholder: '请上传报销凭证',
            rule: [{required: true, message: '请上传报销凭证'}]
          },

        ]
      }
    },
    methods: {
      addReimburse() { // 提交

      },
      afterRead(item) {

      }
    },
    created() {
      this.state = this.$route.query.state;
      this.title = this.state === 'see' ? '报销单' : '申请报销';
    },
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .myReimburse {
    main {
      background-color: #111622;
      padding: 0 20px;
      text-align: left;
      p {
        margin: 10px 0;
        background: #2B354C;
        padding: 20px 10px;
        @include sc(14px, #F2F2F2)
      }

      /deep/ .van-cell {
        @include sc(15px, #FFFFFF);
        background-color: #2B354C;
        margin-top: 10px;
      }
      /deep/ .van-field__control {
        color: #FFFFFF;
      }
      /deep/ .van-cell__title span {
        color: white;
      }
      .van-button {
        font-size: 16px;
        margin-top: 70px;
      }
    }
  }

</style>
