import type { CategoryResponseData } from '@/api/product/attr/type'

// 定义分类仓库state对象得ts类型
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryResponseData[]
}
