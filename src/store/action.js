import {getUserinfo} from '../utils/service';
import {Is_Login} from './mutation-type.js'
import {Toast} from 'vant';
import {setlocalStorage, removelocalStorage} from "../config/Utils";
import router from '../router';

export default {
  // async getCatalogList({commit, state}) { // 设置菜单分类
  //   let data = await getCatalog();
  //   commit(Set_Catalog, JSON.parse(JSON.stringify(data)))
  // },

  async getUserInfo({commit, state}) {
    let msg = '正在登录'
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: msg,
    });
    let res = await getUserinfo(state.loginForm);
    if (res.success) {
      toast.clear();
      router.push({path: "/home"});
      // Toast.success("登录成功");
      // commit(Is_Login, true);
      setlocalStorage("token", res.data.token); // token
    } else {
      Toast.fail(res.msg);
    }
  }
}
