<template>
  <div class="signIn">
    <h2>登录</h2>
    <section>
      <van-form @submit="signIn" ref="form">
        <template v-for="item in fromData">
          <template v-if="item.type == 'text'">
            <van-field
              center
              :error="false"
              :name="item.eName"
              :label="item.cName"
              v-model="item.value"
              :placeholder="item.placeholder"
              :rules="item.rule"
            >
            </van-field>

          </template>
          <template v-if="item.type == 'password'">
            <van-field
              center
              type="password"
              :error="false"
              :name="item.eName"
              :label="item.cName"
              v-model="item.value"
              :placeholder="item.placeholder"
              :rules="item.rule"
            >
            </van-field>

          </template>
        </template>

        <div style="margin: 16px;">

          <van-button color="#2B354C" block type="info" native-type="submit">
            确认登录
          </van-button>
        </div>

      </van-form>

    </section>
  </div>
</template>

<script>
  import {Form, Field, Button, Checkbox, Toast} from 'vant';
  import {setlocalStorage, getlocalStorage, removelocalStorage} from '../config/Utils'
  import http from '../utils/http';
  import urls from '../utils/urls';
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "signIn",
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox,

  },
    data() {
      return {
        fromData: [
          {
            cName: '账号',
            eName: 'username',
            type: 'text',
            value: '',
            placeholder: '请输入账号',
            rule: [{required: true, message: '请输入账号'}]
          },
          {
            cName: '密码',
            eName: 'password',
            type: 'password',
            value: '',
            placeholder: '请输入登录密码',
            rule: [{required: true, message: '请输入登录密码'}]
          },
        ],
      }
    },
    computed: { //
      ...mapState(["isLogin"])
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),

      ...mapMutations([
        'Is_Login',
        'Set_LoginForm',
      ]),

      signIn(values) { // 登录
        this.Set_LoginForm(values);
        this.getUserInfo();
      },

    },
    mounted() {
      this.Is_Login(false);
    },
    created() {
      removelocalStorage("token");
      removelocalStorage("userInfo");
      this.$cookies.remove('autologin');
    }

  }
</script>

<style scoped lang="scss">
  @import 'src/style/mixin';

  .signIn {
    text-align: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
    h2 {
      margin-top: 100px;
    }
    /deep/ .van-cell {
      height: 65px;
      font-size: 17px;
      color: #FFFFFF;
      background-color: #1A202E;
    }
    /deep/ .van-field__control {
      color: #FFFFFF;
    }
    /deep/ .van-cell__title span {
      color: #0078FF;
    }
    .van-button {
      font-size: 16px;
      margin-top: 50px;
    }

  }

</style>
