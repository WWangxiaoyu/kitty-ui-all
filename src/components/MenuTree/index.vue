<template>
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </template>
        <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
    </el-submenu>
    <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)" >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
</template>

<script>
    import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
    export default {
        name: 'MenuTree',
        props: {
            menu: {
                type: Object,
                required: true
            }
        },
        methods: {
            handleRoute (menu) {
                //若是嵌套路由，则转换成iframe的path
                let path = getIFramePath(menu.url)
                if(!path) {
                    path = menu.url
                }
                //通过菜单url跳转到指定路由
                this.$router.push("/" + path)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>