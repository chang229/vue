import { _post } from './axios.js';

let $http = {
    getUserInfo: (data) => _post('/login/info', data), // 获取用户信息
    getLogOut: (data) => _post('/login/out', data), // 退出登录
    getUnit: (data) => _post('/recipe/unAuditCount', data), // 获取服务类型
    getClose: (data) => _post('/service/off', data), // 停诊
    getReceive: (data) => _post('/service/on', data), // 接诊
    getExaminSheetList: (data) => _post('/inquery/diagnosis_list', data), // 获取诊单列表
    getExaminHandList: (data) => _post('inquery/diagnosis_list_finished', data), // 获取已处理诊单
};

export default $http;
