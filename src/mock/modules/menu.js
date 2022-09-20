/**
 * 菜单管理模块
 */

//获取导航菜单树
export function findNavTree() {
  const navTreeData = {
    "code": 200,
    "msg": null,
    "data": [{
      "id": 1,
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": null,
      "parentId": 0,
      "name": "系统管理",
      "url": null,
      "perms": null,
      "type": 0,
      "icon": "el-icon-setting",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
      "children": [{
        "id": 2,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "用户管理",
        "url": "/sys/user",
        "perms": null,
        "type": 1,
        "icon": "el-icon-service",
        "orderNum": 1,
        "delFlag": 0,
        "parentName": "系统管理",
        "level": 1,
        "children": []
      },{
        "id": 3,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "机构管理",
        "url": "/sys/dept",
        "perms": null,
        "type": 1,
        "icon": "el-icon-news",
        "orderNum": 2,
        "delFlag": 0,
        "parentName": "系统管理",
        "level": 1,
        "children": []
      },{
        "id": 4,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "角色管理",
        "url": "/sys/role",
        "perms": null,
        "type": 1,
        "icon": "el-icon-view",
        "orderNum": 4,
        "delFlag": 0,
        "parentName": "系统管理",
        "level": 1,
        "children": []
      },{
        "id": 5,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "菜单管理",
        "url": "/sys/menu",
        "perms": null,
        "type": 1,
        "icon": "el-icon-menu",
        "orderNum": 5,
        "delFlag": 0,
        "parentName": "系统管理",
        "level": 1,
        "children": []
      },{
        "id": 8,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": "admin",
        "lastUpdateTime": "2018-09-23T11:32:28.000+0000",
        "parentId": 1,
        "name": "系统日志",
        "url": "/sys/log",
        "perms": "sys:log:view",
        "type": 1,
        "icon": "el-icon-info",
        "orderNum": 8,
        "delFlag": 0,
        "parentName": "系统管理",
        "level": 1,
        "children": []
      }]  //id为1的children属性结束
    }]  //data(为数组)属性结束
  }   //navTreeData赋值结束
  return {
    url: 'menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
} 