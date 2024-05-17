<script setup lang="ts">
import debounce from 'lodash.debounce'
import { defineProps, withDefaults, ref } from 'vue'
import SearchIcon from '../icons/search-icon.vue'
import BrushIcon from '../icons/brush-icon.vue'

const props = withDefaults(
  defineProps<{
    onChange: (value: string) => void
    debounceTime?: number
    placeholder?: string
  }>(),
  {
    debounceTime: 500
  }
)

const inputValue = ref<string>('')

const clear = () => {
  inputValue.value = ''
  handleChange()
}

const handleChange = debounce(() => {
  props.onChange(inputValue.value)
}, props.debounceTime)
</script>

<template>
  <div class="flex gap-2 items-center p-4 border border-neutral-100 shadow-md rounded-md">
    <div>
      <SearchIcon class="w-4 h-4 bg-neutral" />
    </div>
    <input
      class="outline-none w-full"
      type="text"
      v-model="inputValue"
      @input="handleChange"
      :placeholder="placeholder"
    />
    <button v-if="inputValue" @click="clear">
      <BrushIcon class="w-4 h-4 bg-neutral" />
    </button>
  </div>
</template>
