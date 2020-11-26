import {
  SET_IDENTITY, Set_Catalog, Is_Login,Set_LoginForm,Set_Active,Set_ChooseCart
} from './mutation-type'

export default {
  [SET_IDENTITY](state, active) {
    state.purchaser = active;
  },
  [Set_Catalog](state, active) {
    state.catalog = active;
  },
  [Is_Login](state, active) {
    state.isLogin = active;
  },
  [Set_LoginForm](state, active) {
    state.loginForm = active;
  },
  [Set_Active](state, active) {
    state.active = active;
  },
  [Set_ChooseCart](state, active) {
    state.chooseCart = active;
  }

}
