<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="200px" class="layout_slider">
        <!-- Aside -->
        <Logo></Logo>
        <!-- 左侧菜单 -->
        <el-scrollbar
          class="scrollbar"
          :class="{ fold: useLayout.fold ? true : false }"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header
          class="layout_tabbar"
          :class="{ fold: useLayout.fold ? true : false }"
        >
          <Tabbar></Tabbar>
        </el-header>
        <!-- 主题内容 -->
        <el-main
          class="layout_main"
          :class="{ fold: useLayout.fold ? true : false }"
        >
          <!-- <router-view></router-view> -->
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// 引入logo组件
import Logo from './logo/index.vue'
// 引入左侧菜单组件
import Menu from './menu/index.vue'

// 引入顶部导航组件
import Tabbar from './tabbar/index.vue'

// 引入Main内容组件，直接使用<router-view></router-view>
// 封装的目的是为了添加一些跳转时候的过渡特效
import Main from './main/index.vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

// 引入layout设置小仓库
import useLayoutStore from '@/store/setting'
const useLayout = useLayoutStore()
</script>

<style lang="scss" scoped>
.layout_slider {
  background-color: pink;
  height: 100vh;
  transition: all 0.3s;
}
.scrollbar {
  width: 200px;
  height: calc(100vh - 50px);
  margin-top: 10px;
  &.fold {
    width: 49px;
  }
  .el-menu {
    border-right: none;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.layout_tabbar {
  transition: all 0.3s;
  &.fold {
    // width: calc(100vw - 49px);
  }
}

.layout_main {
  transition: all 0.3s;
  &.fold {
    // width: calc(100vw - 49px);
  }
}
</style>
