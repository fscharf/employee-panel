import { httpClient } from '@/config/http-client'
import { routesConstants } from '@/constants/routes'
import type { IEmployee } from '@/models/employee'

export async function getEmployees(params?: {}): Promise<IEmployee[]> {
  const response = await httpClient<IEmployee[]>(routesConstants.employees, { params })
  return response.data
}

export async function getEmployeeById(id: number): Promise<IEmployee> {
  const response = await httpClient<IEmployee>(`${routesConstants.employees}/${id}`)
  return response.data
}
