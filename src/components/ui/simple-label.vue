<script lang="ts" setup>
defineProps<{ label: string }>()
</script>

<template>
  <div class="flex flex-col pointer-events-none gap-2">
    <label class="text-xs text-neutral-500 font-bold uppercase">{{ label }}</label>
    <slot></slot>
  </div>
</template>
