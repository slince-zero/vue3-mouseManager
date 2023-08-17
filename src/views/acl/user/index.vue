<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary">添加用户</el-button>
      <el-button>批量删除</el-button>
      <div>
        <!-- 展示用户信息 -->
        <el-table style="margin: 10px 0" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="#" align="center"></el-table-column>
          <el-table-column label="ID" align="center"></el-table-column>
          <el-table-column label="用户名字" align="center"></el-table-column>
          <el-table-column label="用户名称" align="center"></el-table-column>
          <el-table-column label="用户角色" align="center"></el-table-column>
          <el-table-column label="创建时间" align="center"></el-table-column>
          <el-table-column label="更新时间" align="center"></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200px"
          ></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNow"
          v-model:page-size="pageNum"
          layout="prev, pager, next, jumper"
          :total="1000"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 当前页
let pageNow = ref(1)

// 一页有几条数据
let pageNum = ref(5)
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
