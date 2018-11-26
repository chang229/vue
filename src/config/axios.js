import Axios from 'axios';
import qs from 'qs';
import { LoadingBar, Modal } from 'iview';

let loginUrl = 'http://*****';// token验证失败跳转地址

// LoadingBar全局配置
LoadingBar.config({
    color: '#5cb85c',
    failedColor: '#f0ad4e',
    height: 5,
});
// 全局默认配置
// 生产环境公用请求URL
if (process.env.NODE_ENV === 'production') {
    Axios.defaults.baseURL = '//yzcrm.111.com.cn';
}

// 超时时间
Axios.defaults.timeout = 5000;

// 设置请求头
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 获取用户token等信息
let localToken = localStorage.getItem('crm_info') ? JSON.parse(localStorage.getItem('crm_info')) : {};

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    LoadingBar.start();
    // 在发送请求之前做些什么
    let postData = {
        'token': localToken.token,
        'login_id': localToken.userId,
        'user_role': localToken.userRole,
        'user_name': localToken.userName,
        'platform_id': localToken.platformId,
        'current_time': localToken.currentTime,
        'biz_data': JSON.stringify(config.data || {}),
    };
    config.data = postData;
    if (config.method === 'post') {
        config.data = qs.stringify(postData);
    }
    return config;
}, function (error) {
    LoadingBar.finish();
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    LoadingBar.finish();
    // 对响应数据做点什么
    if (response.data.ret !== 1) {
        if (response.data.msg === 'token认证失败') {
            Modal.warning({
                title: '警告',
                content: response.data.msg,
                onOk: function () {
                    window.location.href = loginUrl;
                },
            });
        } else {
            Modal.warning({
                title: '警告',
                content: response.data.msg,
            });
        }
    }
    return response.data.data;
}, function (error) {
    LoadingBar.finish();
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 导出
export const _post = (url, data, option) => Axios.post(url, data, option);
export const _get = (url, data, option) => Axios.get(url, data, option);

export default Axios;
