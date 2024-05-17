<script setup lang="ts">
import ArrowLeftIcon from '@/components/icons/arrow-left-icon.vue'
import OrderFilter, { type OrderTypes } from '@/components/ui/order-filter.vue'
import SearchBox from '@/components/ui/search-box.vue'
import SimpleButton from '@/components/ui/simple-button.vue'
import { mainTemplateConstants } from '@/constants/main-template'
import { routesConstants } from '@/constants/routes'
import { useStore } from '@/stores/use-store'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()
const isHome = ref(true)
const back = () => router.back()

const handleChange = async (value: string) => {
  await store.searchEmployees(value)
}

watchEffect(() => {
  isHome.value = route.path === routesConstants.home
})

onMounted(async () => {
  await store.fetchActivities()
})

const handleFilterClick = (value: OrderTypes) => {
  if (value === 'asc') {
    store.sortEmployeesDesc()
  } else {
    store.sortEmployeesAsc()
  }
}
</script>

<template>
  <header class="p-6 md:p-10">
    <section class="flex items-center gap-8">
      <SimpleButton v-if="!isHome" @click="back">
        <span><ArrowLeftIcon class="w-6 h-6" /></span>
      </SimpleButton>
      <h4 class="text-neutral-700 text-2xl font-bold uppercase">
        {{ mainTemplateConstants.employeePanel }}
      </h4>
    </section>

    <section class="flex items-center gap-4 my-8" v-if="isHome">
      <SearchBox
        class="flex-auto"
        :onChange="handleChange"
        :placeholder="mainTemplateConstants.searchByEmployeeName"
      />
      <div class="flex-auto">
        <OrderFilter :onClick="handleFilterClick" />
      </div>
    </section>
  </header>
  <main class="px-6 md:px-10 py-4">
    <slot></slot>
  </main>
</template>
