import { useStore } from '@/stores/use-store'
import { createPinia } from 'pinia'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'

vi.mock('@/services/activity', () => ({
  getActivities: vi.fn().mockResolvedValue([])
}))

vi.mock('@/services/bulletin', () => ({
  getBulletins: vi.fn().mockResolvedValue([])
}))

vi.mock('@/services/employee', () => ({
  getEmployeeById: vi.fn().mockResolvedValue(null),
  getEmployees: vi.fn().mockResolvedValue([])
}))

vi.mock('@/utils/date', () => ({
  sortByDateDesc: vi.fn().mockImplementation((array) => array),
  calculateTotalHours: vi.fn().mockReturnValue(0)
}))

vi.mock('@/utils/number', () => ({
  sortByNumberAsc: vi.fn().mockImplementation((array) => array),
  sortByNumberDesc: vi.fn().mockImplementation((array) => array)
}))

describe('useStore', () => {
  let pinia: any
  let app: any

  beforeAll(() => {
    pinia = createPinia()
  })

  beforeEach(() => {
    app = createApp({})
    app.use(pinia)
    vi.clearAllMocks()
  })

  it('initializes with empty state', () => {
    const store = useStore(pinia)
    expect(store.bulletins).toEqual([])
    expect(store.bulletinDetails).toEqual([])
    expect(store.activities).toEqual([])
    expect(store.employee).toBeNull()
    expect(store.employees).toEqual([])
  })

  it('fetches employees', async () => {
    const store = useStore(pinia)
    await store.fetchEmployees()
    expect(store.employees).toEqual([])
  })

  it('fetches activities', async () => {
    const store = useStore(pinia)
    await store.fetchActivities()
    expect(store.activities).toEqual([])
  })

  it('fetches employee by id', async () => {
    const store = useStore(pinia)
    await store.fetchEmployeeById(1)
    expect(store.employee).toBeNull()
  })

  it('fetches bulletins', async () => {
    const store = useStore(pinia)
    await store.fetchBulletins()
    expect(store.bulletins).toEqual([])
  })

  it('fetches bulletins by employee id', async () => {
    const store = useStore(pinia)
    await store.fetchBulletinsById(1)
    expect(store.bulletinDetails).toEqual([])
  })
})
