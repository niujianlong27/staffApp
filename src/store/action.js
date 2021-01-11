import {getUserinfo} from '../utils/service';
import {Is_Login} from './mutation-type.js'
import {Toast} from 'vant';
import {setlocalStorage, removelocalStorage} from "../config/Utils";
import router from '../router';

export default {
  async getUserInfo({commit, state}) {
    let msg = '正在登录'
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: msg,
    });
    let res = await getUserinfo(state.loginForm);
    if (res.success) {
      setlocalStorage("token", res.data.token); // token
      toast.clear();
      router.push({path: "/home"});
    } else {
      Toast.fail(res.msg);
    }
  }
}
