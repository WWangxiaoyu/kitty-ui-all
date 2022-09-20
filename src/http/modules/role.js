import axios from '../axios'

/**
 * 角色管理模块
 */

//保存
export const save = (data)=> {
    return axios({
        url: '/role/save',
        methods: 'post',
        data
    })
}

//删除
export const del = (data) => {
    return axios({
        url: '/role/delete',
        methods: 'post',
        data
    })
}

//分页查询
export const findPage = (data) => {
    return axios({
        url: '/role/findPage',
        methods: 'post',
        data
    })
}

//查询全部
export const findAll = () => {
    return axios({
        url: '/role/findAll',
        methods: 'get'
    })
}

//查询角色菜单集合
export const findRoleMenus = (params) => {
    return axios({
        url: '/role/findRoleMenus',
        methods: 'get',
        params
    })
}

//保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/saveRoleMenus',
        methods: 'post',
        data
    })
}