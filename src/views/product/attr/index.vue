<template>
    <div>
      <Category/>
      <!-- 分类内容 -->
      <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="Plus">添加属性</el-button>
        <el-table border style="margin: 10px 0;">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="120px"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
      
  <script lang='ts' setup>
  
  </script>
      
  <style lang='scss' scoped></style>
      