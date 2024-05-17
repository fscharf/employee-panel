import { httpClient } from '@/config/http-client'
import { routesConstants } from '@/constants/routes'
import type { IBulletin } from '@/models/bulletin'

export async function getBulletins(params?: {}): Promise<IBulletin[]> {
  const response = await httpClient<IBulletin[]>(routesConstants.bulletins, { params })
  return response.data
}

export async function getBulletinById(id: number): Promise<IBulletin> {
  const response = await httpClient<IBulletin>(`${routesConstants.bulletins}/${id}`)
  return response.data
}
