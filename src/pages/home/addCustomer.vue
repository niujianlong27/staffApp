<template>
  <div class="addCustomer">
    <page-nav :title="'新增客户'"></page-nav>
    <main>
      <van-form @submit="addCustomer" ref="form">
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
          <template v-if="item.type == 'select'">
            <van-field
              :border="false"
              readonly
              clickable
              @clear
              :name="item.eName"
              v-model="item.value"
              :label="item.cName"
              placeholder="请选择"
              @click="item.showPicker = true"
              :error="false"
              :rules="item.rule"
              :required="item.required"
            />
            <van-popup v-model="item.showPicker" position="bottom">
              <van-picker
                show-toolbar
                :title="item.title"
                :value-key="item.key"
                :columns="item.columns"
                @cancel="item.showPicker = false"
                @confirm="pickConfirm($event,item)"
              />

            </van-popup>
          </template>


          <template v-if="(item.type == 'uploader') && uploaderShow">
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

    </main>


  </div>
</template>

<script>
  import pageNav from '../../components/pageNav'
  import {Form, Field, Button, Uploader, Popup, Picker, Toast} from 'vant';
  import urls from '../../utils/urls';
  import http from '../../utils/http';

  export default {
    name: "addCustomer",
    components: {
      pageNav,
      [Form.name]: Form,
      [Uploader.name]: Uploader,
      [Popup.name]: Popup,
      [Field.name]: Field,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Picker.name]: Picker,
    },
    data() {
      return {
        fromData: [
          {
            cName: '客户名称',
            eName: 'nikeName',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入客户名称',
            rule: [{required: true, message: '请输入客户名称'}]
          },
          {
            cName: '客户手机号',
            eName: 'mobile',
            type: 'text',
            value: '',
            required: false,
            placeholder: '请输入客户手机号',
            rule: [{required: true, message: '请输入客户手机号'}]
          },
          {
            required: false,
            cName: '客户身份',
            eName: 'type',
            title: '请选择客户身份',
            type: 'select',
            value: '',
            key: 'text',
            columns: [
              {
                values: [
                  {text: '酒店'},
                  {text: '乡厨'},
                  {text: '批发'},
                  {text: '消费者'},
                ]
              }],
            showPicker: false,
            rule: [{required: true, message: '请选择客户身份'}]
          },

          {
            required: false,
            cName: '客户等级',
            eName: 'area',
            title: '请选择客户等级',
            type: 'select',
            value: '',
            key: 'text',
            columns: [
              {
                values: [
                  {text: '一级'},
                  {text: '二级'},
                  {text: '三级'},
                ]
              }],
            showPicker: false,
            rule: [{required: true, message: '请选择客户等级'}]
          },

          {
            uploadStatus: false,
            required: false,
            cName: '客户证件照片',
            eName: 'idcard',
            type: 'uploader',
            value: [],
            placeholder: '请上传客户证件照片',
            rule: [{required: true, message: '请上传客户证件照片'}]
          },
          {
            uploadStatus: false,
            required: false,
            cName: '客户营业执照',
            eName: 'bizlice',
            type: 'uploader',
            value: [],
            placeholder: '请上传客户营业执照',
            rule: [{required: true, message: '请上传客户营业执照'}]
          },
        ],
        uploaderShow: false,
      }
    },
    methods: {
      addCustomer(values) { // 提交
        values.bizlice = this.bizlice;
        values.idcard = this.idcard;

      },

      afterRead(item) { // 图片上传
        if (item.value.length > 0) {
          if (!item.uploadStatus) {
            let params = {
              base64: item.value[0].content,
              name: item.value[0].file.name,
              type: item.value[0].file.type
            };
            item.value[0].status = 'uploading';
            item.value[0].message = '上传中...';

            http.post(urls.upload, params).then(res => {

              if (res.success) {
                item.uploadStatus = true;
                item.value[0].status = 'success';
                item.value[0].message = '上传成功';
                if (item.eName === 'bizlice') {
                  this.bizlice = res.data.realFileName
                } else {
                  this.idcard = res.data.realFileName
                }

              } else {
                item.value[0].status = 'failed';
                item.value[0].message = '上传失败';
              }
            }).catch(err => {

            })
          }

        } else {
          item.uploadStatus = false;
        }
      },

      pickConfirm(value, item) { // 选择框确定按钮
        if (item.eName == "type") {
          if (value[0].text !== '消费者') {
            this.uploaderShow = true
          } else {
            this.uploaderShow = false
          }
        }
        item.value = `${value[0].text}`;
        item.showPicker = false;
      },


    }
  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/common';

  main {
    background-color: #111622;
    padding: 10px 20px;
    /deep/ .van-cell {
      @include sc(15px, #FFFFFF);
      background-color: #2B354C;
      margin-top: 8px;
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

</style>
