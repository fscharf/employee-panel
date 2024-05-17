<script lang="ts" setup>
import { ref } from 'vue'
import PlusIcon from '../icons/plus-icon.vue'
import MinusIcon from '../icons/minus-icon.vue'

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="shadow-md rounded-md">
    <button
      id="accordion-toggler"
      @click="toggle"
      :class="{ 'rounded-t-md': isOpen, 'rounded-md': !isOpen }"
      class="w-full text-left p-4 border border-neutral-100 hover:bg-neutral-50 transition-colors duration-300 focus:border-indigo-500"
    >
      <div class="flex justify-between items-center">
        <slot name="title"></slot>
        <span v-if="isOpen"><MinusIcon class="w-4 h-4" /></span>
        <span v-else><PlusIcon class="w-4 h-4" /></span>
      </div>
    </button>
    <div v-if="isOpen" class="p-4 text-neutral-700 border border-neutral-100 rounded-b-md">
      <slot></slot>
    </div>
  </div>
</template>
