<template>
  <div class="dayReport">
    <page-nav :title="title"></page-nav>

    <main>

      <template v-if="state  == 'see'">
        <section>
          <p>今日任务：{{obj.planAmt}}</p>
          <p>任务完成：{{obj.finishAmt}}</p>
          <p>市场情况：{{obj.description}}</p>
          <p>实施方案：{{obj.program}}</p>
          <p>明日计划：{{obj.nextPlan}}</p>
        </section>
      </template>

      <template v-else>
        <van-form @submit="addDay" ref="form">
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
            <template v-if="item.type == 'calendar'">
              <van-field :border="false"
                         :value="item.value"
                         :required="item.required"
                         :name="item.eName"
                         :label="item.cName"
                         :placeholder="item.placeholder"
                         @click="item.showPicker = true"/>

              <van-calendar  v-model="item.showPicker" :min-date="item.minDate" :max-date="item.maxDate"
                            @confirm="onConfirm($event,item)"/>
            </template>

          </template>

          <div style="margin: 16px;">

            <van-button color="#2B354C" block type="info" native-type="submit">
              上传日报
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
  import {Form, Field, Button, Toast, Calendar} from 'vant';

  export default {
    name: "dayReport",
    components: {
      pageNav,
      Toast,
      [Calendar.name]: Calendar,
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,

    },
    data() {
      return {
        title: '', // 标题
        state: '',
        title: '', // 标题
        fromData: [
          {
            cName: '今日任务',
            eName: 'planAmt',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入今日任务',
            rule: [{required: true, message: '请输入今日任务'}]
          },
          {
            cName: '完成金额',
            eName: 'finishAmt',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入任务完成情况',
            rule: [{required: true, message: '请输入完成金额'}]
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
            cName: '明日计划',
            eName: 'nextPlan',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入明日计划',
            rule: [{required: true, message: '请输入明日计划'}]
          },

          {
            cName: '日报时间',
            eName: 'startDate',
            type: 'calendar',
            value: '',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(),
            showPicker: false,
            required: false,
            placeholder: '请选择日报时间',
            rule: [{required: true, message: '请选择日报时间'}]
          },

        ],
        startDate: "",
        endDate: ""
      }
    },
    methods: {
      addDay(values) {
        values.startDate = this.startDate;
        values.endDate = this.startDate;
        http.post(urls.addWorkreport, {type: 3, ...values}).then(res => {
          if (res.success) {
            Toast.success('添加成功！');
            this.$router.go(-1)
          }

        }).catch(err => {

        })

      },
      onConfirm(date, item) {
        this.startDate = this.formatDate(date);
        item.value = `${this.startDate}`;
        item.showPicker = false;
      },


      formatDate(date) {
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
        return `${Y}${ M}${D}`;
      },
    },
    created() {
      this.obj = this.$route.query.data;
      this.state = this.$route.query.state;
      this.title = this.state === 'see' ? '日报' : '编辑日报';
    },
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

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

    /deep/ .van-calendar__day {
      color: black;
    }

    /deep/ .van-calendar__header {
      color: black;
    }
  }
</style>
