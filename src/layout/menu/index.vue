<template>
  <el-menu
    :default-active="$route.path"
    :collapse="useLayout.fold ? true : false"
  >
    <template v-for="item in menuList" :key="item.path">
      <!--没有子路由-->
      <template v-if="!item.children">
        <el-menu-item
          :index="item.path"
          v-if="!item.meta.hidden"
          @click="goRoute"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由但是只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          :index="item.children[0].path"
          v-if="!item.children[0].meta.hidden"
          @click="goRoute"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由且个数大于一个 -->
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <myMenu :menuList="item.children"></myMenu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/setting'

// 引入路由对象，目的是为了获取点击菜单时候的路径
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

//获取路由器对象
let $router = useRouter()
//点击菜单的回调
const goRoute = (vc: any) => {
  //路由跳转
  $router.push(vc.index)
}
// 获取路由对象
const $route = useRoute()

const useLayout = useLayoutStore()
</script>
<script lang="ts">
export default {
  name: 'myMenu',
}
</script>

<style scoped></style>
