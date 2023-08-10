<template>
  <div>主页</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="scss"></style>
