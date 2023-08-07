<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.fade-enter-from{
    opacity: 0;
    transform: rotate(0deg);
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
    transform: rotate(0deg);
}
</style>
