<script setup lang="ts">
import BulletinCard from '@/components/bulletin/bulletin-card.vue'
import LoaderSpinner from '@/components/ui/loader-spinner.vue'
import { bulletinViewConstants } from '@/constants/bulletin-view'
import { useStore } from '@/stores/use-store'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const isLoading = ref(true)

watch(
  () => route.params.id,
  async (id) => {
    await store.fetchEmployeeById(parseInt(id as string))
    await store.fetchBulletinsById(parseInt(id as string))
    isLoading.value = false
  },
  { immediate: true }
)
console.log(isLoading.value)
</script>

<template>
  <h2 class="mb-8 font-bold uppercase">{{ bulletinViewConstants.bulletins }}</h2>
  <LoaderSpinner v-if="isLoading" />
  <article v-else-if="store.bulletinDetails.length">
    <h1 class="mb-8 uppercase" v-if="store.employee">{{ store.employee.name }}</h1>
    <section class="flex flex-col gap-4">
      <BulletinCard
        v-for="bulletinDetails in store.bulletinDetails"
        :bulletinDetails="bulletinDetails"
        :key="bulletinDetails.id"
      />
    </section>
  </article>
  <article v-else>
    <h2>{{ bulletinViewConstants.noBulletinsFound }}</h2>
  </article>
</template>
