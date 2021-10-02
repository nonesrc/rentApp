import { ref } from 'vue'
import {
  shopRentGoodsPrice,
  shopSellGoodsPrice,
  shopGoodsOverview,
  shopGoodsDetails,
} from '../model'
import {
  getRentGoodsList_API,
  getSellGoodsList_API,
  getRentGoodsDetails_API,
  getSellGoodsDetails_API,
} from '../api'
import { axiosDataResolveHandle } from '../utils/helper'

export default function () {
  // 租赁商品基本配置
  const rentGoodsListConfig = { ...shopGoodsOverview, ...shopRentGoodsPrice }
  // 出售商品基本配置
  const sellGoodsListConfig = { ...shopGoodsOverview, ...shopSellGoodsPrice }
  // 租赁商品详细配置
  const rentGoodsDetails = {
    ...shopGoodsDetails,
    ...shopRentGoodsPrice,
    _showPrice: 0,
  }
  // 出售商品详细配置
  const sellGoodsDetails = {
    ...shopGoodsDetails,
    ...shopSellGoodsPrice,
    _showPrice: 0,
  }
  // 当前租赁商品列表
  const currentRentGoodsList = ref([])
  // 当前出售商品列表
  const currentSellGoodsList = ref([])
  // 当前租赁商品详情
  const currentRentGoodsDetails = ref({ ...rentGoodsDetails })
  // 当前出售商品详情
  const currentSellGoodsDetails = ref({ ...sellGoodsDetails })

  // 获取租赁或出售商品的详细信息
  const getGoodsDetails = async (goods_id, type = 'rent') => {
    const { code, success, msg, data } = axiosDataResolveHandle(
      type === 'rent'
        ? await getRentGoodsDetails_API(goods_id)
        : await getSellGoodsDetails_API(goods_id)
    )
    if (type === 'rent') {
      currentRentGoodsDetails.value = data
      currentRentGoodsDetails.value._showPrice =
        currentRentGoodsDetails.value.rent_money
    } else {
      currentSellGoodsDetails.value = data
      currentSellGoodsDetails.value._showPrice =
        currentSellGoodsDetails.value.market_price
    }
  }

  // 获取当前店铺的租赁或出售商品列表
  const getGoodsList = async (sort, page, count, type = 'rent') => {
    const { code, success, msg, data } = axiosDataResolveHandle(
      type === 'rent'
        ? await getRentGoodsList_API(sort, page, count)
        : await getSellGoodsList_API(sort, page, count)
    )
    type === 'rent'
      ? currentRentGoodsList.value.push(...data)
      : currentSellGoodsList.value.push(...data)
  }

  // 清空商品列表
  const clearGoodsList = type => {
    ;(type === 'rent' && (currentRentGoodsList.value = [])) ||
      (type === 'sell' && (currentSellGoodsList.value = []))
    if (!type) {
      currentRentGoodsList.value = []
      currentSellGoodsList.value = []
    }
  }

  return {
    currentRentGoodsList,
    currentSellGoodsList,
    currentRentGoodsDetails,
    currentSellGoodsDetails,
    getGoodsDetails,
    getGoodsList,
    clearGoodsList,
  }
}
