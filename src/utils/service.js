import http from "./http"
import urls from "./urls"
import {Toast} from 'vant';


export const getUserinfo = async (values) => {
  return new Promise((resolve, reject) => {
    http.post(`${urls.login}?username=${values.username}&password=${values.password}`, {}).then(res => {
        resolve(res)
      }
    ).catch(err => {

    });
  })

};
