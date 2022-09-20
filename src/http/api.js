/**
 * 接口统一集成模块
 */
import * as login from './modules/login'
import * as dept from './modules/dept'
import * as log from './modules/log'
import * as menu from './modules/menu'
import * as role from './modules/role'
import * as user from './modules/user'

/* 
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */


// 默认全部导出
export default {
    login,
    dept,
    log,
    menu,
    role,
    user
}