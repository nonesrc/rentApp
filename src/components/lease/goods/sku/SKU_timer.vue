<template>
  <div class="lease-sku-timer">
    <div class="banenr">选取租赁时间</div>
    <div class="btn-box">
      <van-button plain color="#2c394b" size="small" @click="beginSelector">{{
        beginTime === 0
          ? '选取开始时间'
          : dateFormat('m月d日 H时', new Date(beginTime))
      }}</van-button>
      <van-icon name="arrow" />
      <van-button plain color="#2c394b" size="small" @click="endSelector">{{
        endTime === 0
          ? '选取结束时间'
          : dateFormat('m月d日 H时', new Date(endTime))
      }}</van-button>
    </div>
    <van-action-sheet v-model:show="showPicker">
      <van-datetime-picker
        v-model="currentTime"
        type="datehour"
        visible-item-count="3"
        title="年/月/日/小时"
        @confirm="confirmTime"
        @cancel="showPicker = false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { DatetimePicker, ActionSheet, Button, Icon } from 'vant'
import { dateFormat } from '../../../../utils/helper'
export default defineComponent({
  name: 'lease_sku_timer',
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  setup(props, ctx) {
    // 当前选取时间模式
    const currentPickMode = ref('begin')
    // 是否展示时间选择器
    const showPicker = ref(false)
    // 选择的时间
    const currentTime = ref(new Date())
    // 开始时间
    const beginTime = ref(0)
    // 结束时间
    const endTime = ref(0)
    // 选取开始时间
    const beginSelector = () => {
      currentPickMode.value = 'begin'
      showPicker.value = true
    }
    // 选取结束时间
    const endSelector = () => {
      currentPickMode.value = 'end'
      showPicker.value = true
    }
    // 确认选取时间
    const confirmTime = time => {
      let timeFormat = new Date(time).getTime()
      if (currentPickMode.value === 'begin') {
        beginTime.value = timeFormat
        ctx.emit('changeBeginTime', timeFormat)
      } else {
        endTime.value = timeFormat
        ctx.emit('changeEndTime', timeFormat)
      }
      showPicker.value = false
    }
    return {
      dateFormat,
      showPicker,
      currentTime,
      beginTime,
      endTime,
      beginSelector,
      endSelector,
      confirmTime,
    }
  },
})
</script>

<style lang="scss">
@import '../../../../assets/styles/index.scss';
.lease-sku-timer {
  margin: $g-1 0;
  padding: 0 $g-1 * 1.6;
  .banenr {
    font-size: 14px;
    margin-bottom: $g-2;
  }
  .btn-box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
