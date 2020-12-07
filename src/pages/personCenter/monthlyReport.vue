<template>
  <div class="monthlyReport">
    <page-nav :title="title"></page-nav>
    <main>

      <template v-if="state  == 'see'">
        <section>
          <p>本月任务：{{obj.planAmt}}</p>
          <p>任务完成：{{obj.finishAmt}}</p>
          <p>市场情况：{{obj.description}}</p>
          <p>实施方案：{{obj.program}}</p>
          <p>下月计划：{{obj.nextPlan}}</p>
        </section>
      </template>

      <template v-else>
        <van-form @submit="addMonthly" ref="form">
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

          </template>

          <div style="margin: 16px;">

            <van-button color="#2B354C" block type="info" native-type="submit">
              上传月报
            </van-button>
          </div>

        </van-form>
      </template>

    </main>
  </div>

</template>

<script>
  import http from "../../utils/http";
  import urls from '../../utils/urls';
  import pageNav from '../../components/pageNav'
  import {Form, Field, Button, Toast} from 'vant';

  export default {
    name: "monthlyReport",
    components: {
      pageNav,
      [Form.name]: Form,
      [Field.name]: Field,
      [Toast.name]: Toast,
      [Button.name]: Button,

    },
    data() {
      return {
        obj:{}, // 月报详情
        state: '',
        title: '', // 标题
        fromData: [
          {
            cName: '本月任务',
            eName: 'planAmt',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入本月任务',
            rule: [{required: true, message: '请输入本月任务'}]
          },
          {
            cName: '任务完成',
            eName: 'finishAmt',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入任务完成情况',
            rule: [{required: true, message: '请输入任务完成情况'}]
          },
          {
            cName: '市场情况',
            eName: 'description',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入市场情况',
            rule: [{required: true, message: '请输入市场情况'}]
          },
          {
            cName: '实施方案',
            eName: 'program',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入实施方案',
            rule: [{required: true, message: '请输入实施方案'}]
          },
          {
            cName: '下月计划',
            eName: 'nextPlan',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入下月计划',
            rule: [{required: true, message: '请输入下月计划'}]
          },

        ]
      }
    },
    methods: {
      addMonthly(values) {
        http.post(urls.addWorkreport, {type: 2, ...values}).then(res => {
          if (res.success) {
            this.$router.go(-1)
          }

        }).catch(err => {

        })
      }
    },
    created() {
      this.obj = this.$route.query.data;
      this.state = this.$route.query.state;
      this.title = this.state === 'see' ? '月报' : '编辑月报';
    },
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  .monthlyReport {
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
