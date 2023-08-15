<template>
  <div>
    <!-- 三个分类 -->
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" @change="handler">
            <el-option
              v-for="(c1, index) in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id" @change="handler2">
            <el-option
              v-for="(c2, index) in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id">
            <el-option
              v-for="(c3, index) in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 分类内容 -->
    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// 引入商品分类管理的小仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}

// 一级分类选中值得时候会触发
const handler = () => {
  ;(categoryStore.c2Id = ''),
    (categoryStore.c3Arr = []),
    (categoryStore.c3Id = ''),
    categoryStore.getC2()
}
// 二级分类选中值得时候会触发
const handler2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
</script>

<style lang="scss" scoped></style>
