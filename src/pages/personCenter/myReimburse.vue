<template>
  <div class="myReimburse">
    <page-nav :title="title"></page-nav>
    <main>

      <template v-if="state  == 'see'">
        <section>
          <p>报销事由：{{obj.title}}</p>
          <p>报销金额：¥ {{obj.amount}}</p>
          <p>报销时间：{{obj.sedate}}</p>
          <p><span >报销凭证:</span>
            <span style="display: block;text-align: center"><img :src="obj.certificate | setImg" alt=""></span></p>
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

            <template v-if="item.type == 'calendar'">
              <van-field :border="false"
                         :value="item.value"
                         :required="item.required"
                         :name="item.eName"
                         :label="item.cName"
                         :rules="item.rule"
                         :placeholder="item.placeholder"
                         @click="item.showPicker = true"/>

              <van-calendar v-model="item.showPicker" :min-date="item.minDate" :max-date="item.maxDate"
                            @confirm="onConfirm($event,item)"/>
            </template>


            <template v-if="item.type == 'uploader'">
              <van-field :key="item.eName" :border="false" :required="item.required" :name="item.eName"
                         :rules="item.rule"
                         :label="item.cName">
                <template #input>
                  <van-uploader :after-read="afterRead" :max-count="1" v-model="item.value"/>
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
  import {Form, Field, Calendar, Button, Toast, Uploader} from 'vant';
  import urls from '../../utils/urls';
  import http from '../../utils/http';

  export default {
    name: "myReimburse",
    components: {
      pageNav,
      [Calendar.name]: Calendar,
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
            eName: 'title',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入报销事由',
            rule: [{required: true, message: '请输入报销事由'}]
          },
          {
            cName: '报销金额',
            eName: 'amount',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入报销金额',
            rule: [{required: true, message: '请输入报销金额'}]
          },
          {
            cName: '报销时间',
            eName: 'sedate',
            type: 'calendar',
            value: '',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(),
            showPicker: false,
            required: false,
            placeholder: '请选择报销时间',
            rule: [{required: true, message: '请选择报销时间'}]
          },

          {
            required: false,
            cName: '报销凭证',
            eName: 'certificate',
            type: 'uploader',
            value: [],
            placeholder: '请上传报销凭证',
            rule: [{required: true, message: '请上传报销凭证'}]
          },

        ],
        obj: {},
        certificate: "",
      }
    },
    methods: {

      addReimburse(value) { // 提交
        value.certificate = this.certificate;
        http.post(urls.addSeaccount, value).then(res => {
          if (res.success) {
            Toast.success('添加成功！');
            this.$router.go(-1)

          }

        }).catch(err => {

        })
      },


      afterRead(item) {
        let params = {
          base64: item.content,
          name: item.file.name,
          type: item.file.type
        };
        item.status = 'uploading';
        item.message = '上传中...';
        // let formData = new FormData();
        // for (var key in files) {
        //   formData.append(key, files[key])
        // }
        // formData.append('file', files);
        //
        // console.log(formData);
        http.post(urls.upload, params).then(res => {
          if (res.success) {
            item.status = '';
            this.certificate = res.data.realFileName
          } else {
            item.status = 'failed';
            item.message = '上传失败';
          }
        }).catch(err => {

        })


      },
      onConfirm(date, item) { // 时间选择

        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
        item.value = `${Y}${ M}${D}`;
        item.showPicker = false;
      },
    },
    created() {
      this.obj = this.$route.query.data;
      console.log(this.obj);
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
      /deep/ .van-calendar__day {
        color: black;
      }

      /deep/ .van-calendar__header {
        color: black;
      }
    }
  }

</style>
