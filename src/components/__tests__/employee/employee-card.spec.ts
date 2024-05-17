import EmployeeCard from '@/components/employee/employee-card.vue' // Update with your actual path
import type { ICurrentActivity } from '@/models/activity'
import type { IEmployee } from '@/models/employee'
import { config, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

config.global.stubs = {
  RouterLink: { template: '<a><slot /></a>' }
}

const mockGetCurrentActivity = vi.fn()

vi.mock('@/stores/use-store', () => ({
  useStore: () => ({
    getCurrentActivity: mockGetCurrentActivity
  })
}))

describe('EmployeeCard.vue', () => {
  const employee: IEmployee = {
    id: 1,
    name: 'John Doe',
    code: 'JD123',
    image: 'path/to/image.jpg',
    active: true
  }

  const currentActivity: ICurrentActivity = {
    id: 1,
    color: '#000',
    code: 123,
    description: 'Recent Activity',
    date: '2010-01-20 19:00:00'
  }

  beforeEach(() => {
    mockGetCurrentActivity.mockReturnValue(currentActivity)
  })

  it('renders employee details correctly', async () => {
    const wrapper = mount(EmployeeCard, {
      props: {
        employee
      }
    })

    expect(wrapper.text()).toContain(employee.name)
    expect(wrapper.text()).toContain(employee.code)
    expect(wrapper.find('img').attributes('src')).toBe(employee.image)
  })

  it('displays current activity if available', async () => {
    const wrapper = mount(EmployeeCard, {
      props: {
        employee
      }
    })

    await nextTick()

    expect(wrapper.find('.w-4.h-4.rounded-full.animate-pulse').exists()).toBe(true)
    expect(wrapper.text()).toContain(currentActivity.code)
    expect(wrapper.text()).toContain(currentActivity.description)
  })

  it('displays no recent activity message if no activity is available', async () => {
    mockGetCurrentActivity.mockReturnValueOnce(null)

    const wrapper = mount(EmployeeCard, {
      props: {
        employee
      }
    })

    expect(wrapper.text()).toContain('Nenhuma atividade recente')
  })
})
