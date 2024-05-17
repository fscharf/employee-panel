<script setup lang="ts">
import FileArrowDownIcon from '@/components/icons/file-arrow-down-icon.vue'
import FileArrowUpIcon from '@/components/icons/file-arrow-up-icon.vue'
import SimpleButton from '@/components/ui/simple-button.vue'
import { ref } from 'vue'

export type OrderTypes = 'asc' | 'desc'

const props = defineProps<{
  onClick: (value: OrderTypes) => void
}>()
const orderType = ref<OrderTypes>('desc')

const handleClick = () => {
  if (orderType.value === 'asc') {
    orderType.value = 'desc'
  } else {
    orderType.value = 'asc'
  }
  props.onClick(orderType.value)
}
</script>

<template>
  <SimpleButton @click="handleClick">
    <span v-if="orderType === 'asc'">
      <FileArrowUpIcon class="w-8 h-8" />
    </span>
    <span v-else>
      <FileArrowDownIcon class="w-8 h-8" />
    </span>
  </SimpleButton>
</template>
