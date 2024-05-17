<script setup lang="ts">
import SimpleAccordion from '@/components/ui/simple-accordion.vue'
import SimpleLabel from '@/components/ui/simple-label.vue'
import { bulletinCardConstants } from '@/constants/bulletin-card'
import type { IBulletinDetails } from '@/models/bulletin'
import { useStore } from '@/stores/use-store'
import { isLastIndex } from '@/utils/array'
import { formatDateTime } from '@/utils/date'
import { defineProps } from 'vue'
defineProps<{
  bulletinDetails: IBulletinDetails
}>()
const store = useStore()
</script>

<template>
  <SimpleAccordion v-if="bulletinDetails">
    <template #title>
      <div class="flex gap-8 items-center">
        <SimpleLabel :label="bulletinCardConstants.id">
          <span class="font-bold">
            {{ bulletinDetails.id }}
          </span>
        </SimpleLabel>
        <SimpleLabel :label="bulletinCardConstants.start">
          {{ formatDateTime(bulletinDetails.startDate) }}
        </SimpleLabel>
        <SimpleLabel :label="bulletinCardConstants.end">
          {{ formatDateTime(bulletinDetails.endDate) }}
        </SimpleLabel>
        <SimpleLabel :label="bulletinCardConstants.totalHours">
          {{ bulletinDetails.totalHours }}h
        </SimpleLabel>
      </div>
    </template>
    <section class="flex flex-col" v-if="bulletinDetails.appointments">
      <h2 class="font-bold uppercase">{{ bulletinCardConstants.activities }}</h2>
      <div
        v-for="(appointment, index) in bulletinDetails.appointments"
        :key="appointment.id"
        :class="[
          'flex gap-8 py-6',
          {
            'border-b border-b-neutral-100': !isLastIndex(index, bulletinDetails.appointments)
          }
        ]"
      >
        <SimpleLabel :label="bulletinCardConstants.id">
          {{ appointment.id }}
        </SimpleLabel>
        <SimpleLabel :label="bulletinCardConstants.date">
          {{ formatDateTime(appointment.date) }}
        </SimpleLabel>
        <SimpleLabel :label="bulletinCardConstants.activity" v-if="store.activities.length">
          <span class="flex items-center gap-2">
            <div
              class="rounded-full w-4 h-4"
              :style="{ backgroundColor: store.getActivity(appointment.activityId)?.color }"
            />
            {{ store.getActivity(appointment.activityId)?.description }}
          </span>
        </SimpleLabel>
      </div>
    </section>
  </SimpleAccordion>
</template>
