<script setup lang="ts">
import { employeeCardConstants } from '@/constants/employee-card'
import type { ICurrentActivity } from '@/models/activity'
import type { IEmployee } from '@/models/employee'
import { useStore } from '@/stores/use-store'
import { formatDateTime } from '@/utils/date'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  employee: IEmployee
}>()

const currentActivity = ref<ICurrentActivity>()
const store = useStore()

onMounted(() => {
  currentActivity.value = store.getCurrentActivity(props.employee.id)
})
</script>

<template>
  <RouterLink
    v-if="employee"
    :to="{ name: 'bulletin', params: { id: employee.id } }"
    class="border border-neutral-100 items-center justify-center md:flex-1 hover:shadow-lg transition-shadow duration-300 shadow-md rounded-md"
  >
    <article class="flex flex-col items-center relative p-5">
      <div
        v-if="currentActivity"
        class="w-4 h-4 rounded-full animate-pulse absolute top-4 left-4"
        :style="{ backgroundColor: currentActivity.color }"
      ></div>
      <img
        class="shadow-md max-w-12 rounded-full mb-4"
        :src="employee.image"
        :alt="employee.name"
      />

      <section class="flex items-center gap-2 mb-8 uppercase">
        <span class="font-bold">
          {{ employee.code }}
        </span>
        {{ employee.name }}
      </section>
      <section class="mb-2">
        <span class="text-xs font-bold uppercase">{{ employeeCardConstants.recentActivity }}</span>
        <div class="border-b border-b-neutral-100 w-full"></div>
      </section>
      <section v-if="currentActivity" class="flex flex-col gap-2 items-center">
        <span>{{ currentActivity.code }} - {{ currentActivity.description }}</span>
        <small class="text-neutral-500">{{ formatDateTime(currentActivity.date) }}</small>
      </section>
      <section v-else>
        <small class="text-xs text-neutral-500">{{ employeeCardConstants.noRecentActivity }}</small>
      </section>
    </article>
  </RouterLink>
</template>
