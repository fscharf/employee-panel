import { httpClient } from '@/config/http-client'
import { routesConstants } from '@/constants/routes'
import type { IActivity } from '@/models/activity'

export async function getActivities(): Promise<IActivity[]> {
  const response = await httpClient<IActivity[]>(routesConstants.activities)
  return response.data
}

export async function getActivityById(id: number): Promise<IActivity> {
  const response = await httpClient<IActivity>(`${routesConstants.activities}/${id}`)
  return response.data
}
