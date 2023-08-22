<template>
  <el-card>
    <div class="box">
      <img class="avatar" :src="userStore.avatar" />
      <h1 class="title">你好呀{{ userStore.username }}</h1>
    </div>
  </el-card>
  <div class="bgc">
    <img src="../../../public/manworks.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
console.log(userStore)
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    font-size: 30px;
    margin: 30px;
  }
}
.bgc {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 600px;
  }
}
</style>
