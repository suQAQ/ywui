import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'

//响应拦截器
axios.interceptors.response.user(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        //500业务逻辑错误, 401未登录, 403权限禁止
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({ message: success.data.message });
            return;
        }
        if (success.data.message) {
            Message.success({ message: success.data.message });
        }
    }
    return success.data;
}, error => {
    //404页面找不到, 504服务器问题
    if (error.response.code == 404 || error.response.code == 504) {
        Message.error({ message: "服务器被吃了( ╯□╰ )" });
    } else if (error.response.code == 403) {
        Message.error({ message: "权限不足" });
    } else if (error.response.code == 401) {
        Message.error({ message: "尚未登录, 请登录!error.response.data.message" });
        //跳转登录
        router.replace("/");
    } else {
        if (error.response.data.message) {
            Message.error({ message: error.response.data.message });
        } else {
            Message.error({ message: "未知错误!" });
        }
    }
    return;
})

let base = "";//防止后续改路径

//传送json格式post请求
export const postRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params
    });
}