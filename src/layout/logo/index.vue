<!-- 封装logo组件 -->
<template>
  <div class="logo">
    <img src="../../../g.png" alt="" />
    <p>小鼠管理平台</p>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 50px;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    position: relative;
    height: 50px;
    border-radius: 50%;
    top: 4px;
  }
  p {
    position: relative;
    font-size: 19px;
    margin-left: 10px;
    top: 7px;
  }
}
</style>
