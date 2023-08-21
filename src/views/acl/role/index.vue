<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位">
          <el-input placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加职位</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="260px"
        ></el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNow"
      v-model:page-size="pageNum"
      layout="prev, pager, next, jumper"
      :total="total"
      background
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const pageNow = ref(1)
let pageNum = ref(5)
const total = ref(0)

</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
