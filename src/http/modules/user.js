import axios from '../axios'

/**
 * 用户管理模块
 */

//保存
export const save = (data) => {
    return axios({
        url: '/user/save',
        method: 'post',
        data
    })
}

//删除
export const del = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/user/findPage',
        method: 'post',
        data
    })
}
//查找用户菜单权限
export const findPermissions  = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params 
    })
}