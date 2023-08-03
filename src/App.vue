<template>
  <div>
    <h1>APP</h1>
  </div>
</template>

<script setup lang="ts">
import{reqLogin} from './api/user'
import { onMounted } from 'vue'

onMounted(()=>{
  reqLogin({username:'admin',password:'111111'}).then((req)=>{
    console.log(req);
    
  })
})

</script>

<style scoped lang="scss">
div{
  h1{
    color: $color;
  }
}
</style>
