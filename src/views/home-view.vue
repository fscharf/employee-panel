<script setup lang="ts">
import EmployeeCard from '@/components/employee/employee-card.vue'
import LoaderSpinner from '@/components/ui/loader-spinner.vue'
import { employeeViewContants } from '@/constants/employee-view'
import { useStore } from '@/stores/use-store'
import { onMounted, ref } from 'vue'

const store = useStore()
const isLoading = ref(true)

onMounted(async () => {
  await store.fetchBulletins()
  await store.fetchEmployees()
  isLoading.value = false
})
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
    v-else-if="store.employees.length"
  >
    <EmployeeCard v-for="employee in store.employees" :key="employee.id" :employee="employee" />
  </section>
  <section v-else>
    <h2>{{ employeeViewContants.noEmployeeFound }}</h2>
  </section>
</template>
