// 品牌管理模块接口
import request from '@/utils/request'
// 引入接口类型
import {TradeMarkResponseData} from './type'
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

// page：获取第几页，默认第一页
// limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
