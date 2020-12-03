import {
  Is_Login, Set_LoginForm, Set_Active,
} from './mutation-type'

export default {

  [Is_Login](state, active) {
    state.isLogin = active;
  },
  [Set_LoginForm](state, active) {
    state.loginForm = active;
  },
  [Set_Active](state, active) {
    state.active = active;
  }
}
