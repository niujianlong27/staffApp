<template>
  <div class="myMessage">
    <nav class="textLeft">
      站内信
    </nav>
    <main>
      <div><span class="left">你的报销申请已被查看！</span><span class="right">2020-08-09</span></div>
    </main>
    <foot></foot>

  </div>
</template>

<script>
  import pageNav from '../../components/pageNav'
  import urls from '../../utils/urls';
  import http from '../../utils/http';
  import foot from '../../components/foot';

  import {
    Checkbox,
    Cell,
    Empty,
    Stepper,
    CellGroup,
    Button,
    List,
    Loading,
    CheckboxGroup,
    SubmitBar,
    Toast
  } from 'vant';

  export default {
    name: "myMessage",
    components: {
      pageNav, foot,
      [Checkbox.name]: Checkbox,
      [Loading.name]: Loading,
      [CheckboxGroup.name]: CheckboxGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Stepper.name]: Stepper,
      [SubmitBar.name]: SubmitBar,
      [Button.name]: Button,
      [Empty.name]: Empty,
      [List.name]: List,
      [Toast.name]: Toast,
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

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
    main{
      background-color: #111622;
    }
    main > div {
      background: #2B354C;
      overflow: hidden;
      padding: 20px;
      border-radius: 5px;
      span{
        font-size: 12px;
        &:first-child{
          color: #F2F2F2;
        }
        &:last-child{
          color: #8094BD;
        }
      }
    }
  }

</style>
