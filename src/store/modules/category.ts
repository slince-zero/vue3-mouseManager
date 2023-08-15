// 商品分类管理的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
// import type { CategoryResponseData } from '@/api/product/attr/type'
// import type { CategoryState } from './type'
const useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      // 存储一级分类的数据
      c1Arr: [],
      // 一级分类ID
      c1Id: '',
      // 存储二级分类数据
      c2Arr: [],
      // 二级分类ID
      c2Id: '',
      // 存储三级分类数据
      c3Arr: [],
      // 三级分类ID
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类的方法
    async getC1() {
      const result: any = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类的方法
    async getC2() {
      const result: any = await reqC2(this.c1Id)
      this.c2Arr = result.data
    }, // 获取三级分类的方法
    async getC3() {
      const result: any = await reqC3(this.c2Id)
      this.c3Arr = result.data
    },
  },
  getters: {},
})

export default useCategoryStore
