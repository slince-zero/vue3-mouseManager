<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top/>
      </div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from './components/Top/index.vue'
import { ref, onMounted } from 'vue'
// 获取数据大屏展示内容的盒子元素
const screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScle()}) translate(-50%,-50%)`
})

// 定义大屏缩放比例
function getScle(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScle()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  block-size: corver;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    // background-color: rgb(189, 248, 121);
    top: 50%;
    left: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
      // background-color: rgb(72, 204, 127);
    }
    .bottom {
      display: flex;

      .left {
        flex: 1;
      }
      .center {
        flex: 2;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
