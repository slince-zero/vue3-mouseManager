<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import useLayoutStore from '@/store/setting'
const useLayout = useLayoutStore()

// 控制刷新时组件是否重建
let flag = ref(true)

// 监听小仓库中的refresh属性是否发生变化
watch(
  () => useLayout.refresh,
  () => {
    // 点击刷新按钮时，销毁组件
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: rotate(0deg);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: rotate(0deg);
}
</style>
