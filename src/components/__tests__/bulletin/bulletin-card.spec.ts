import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import BulletinCard from '@/components/bulletin/bulletin-card.vue'
import SimpleAccordion from '@/components/ui/simple-accordion.vue'
import SimpleLabel from '@/components/ui/simple-label.vue'
import type { IBulletinDetails } from '@/models/bulletin'
import { nextTick } from 'vue'

const mockGetActivity = vi.fn()

const mockStore = {
  activities: [{ id: 1, color: 'red', description: 'Activity 1' }],
  getActivity: mockGetActivity
}

vi.mock('@/stores/use-store', () => ({
  useStore: () => mockStore
}))

describe('BulletinCard.vue', () => {
  const bulletinDetails: IBulletinDetails = {
    id: 1,
    employeeId: 2,
    startDate: '2020-01-01 12:00:00',
    endDate: '2020-01-01 17:00:00',
    totalHours: 8,
    appointments: [
      {
        id: 1,
        date: '2020-01-01 12:00:00',
        activityId: 1
      }
    ]
  }

  beforeEach(() => {
    mockGetActivity.mockReset()
    mockGetActivity.mockReturnValue(mockStore.activities[0])
  })

  it('renders bulletin details correctly', async () => {
    const wrapper = mount(BulletinCard, {
      props: {
        bulletinDetails
      },
      global: {
        components: {
          SimpleAccordion,
          SimpleLabel
        }
      }
    })

    const button = wrapper.find('#accordion-toggler')
    button.trigger('click')

    await nextTick()

    expect(wrapper.text()).toContain(bulletinDetails.id)
    expect(wrapper.text()).toContain(bulletinDetails.totalHours + 'h')
    expect(wrapper.text()).toContain('Atividades')
  })

  it('renders appointments correctly', async () => {
    const wrapper = mount(BulletinCard, {
      props: {
        bulletinDetails
      },
      global: {
        components: {
          SimpleAccordion,
          SimpleLabel
        }
      }
    })

    const button = wrapper.find('#accordion-toggler')
    button.trigger('click')

    await nextTick()

    const appointment = bulletinDetails.appointments[0]

    expect(wrapper.text()).toContain(appointment.id)
    expect(wrapper.text()).toContain(mockStore.activities[0].description)
    expect(wrapper.find('.rounded-full').attributes('style')).toContain('background-color: red;')
  })
})
