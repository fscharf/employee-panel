import type { IActivity } from '@/models/activity'
import type { IBulletin, IBulletinDetails } from '@/models/bulletin'
import type { IEmployee } from '@/models/employee'
import { getActivities } from '@/services/activity'
import { getBulletins } from '@/services/bulletin'
import { getEmployeeById, getEmployees } from '@/services/employee'
import { calculateTotalHours, sortByDateDesc } from '@/utils/date'
import { sortByNumberAsc, sortByNumberDesc } from '@/utils/number'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    bulletins: [] as IBulletin[],
    bulletinDetails: [] as IBulletinDetails[],
    activities: [] as IActivity[],
    employee: null as IEmployee | null,
    employees: [] as IEmployee[]
  }),
  getters: {
    getActivity: (state) => {
      return (id: number) => state.activities.find((activity) => activity.id === id)
    },
    getBulletinsByEmployeeId: (state) => {
      return (employeeId: number) => {
        return state.bulletins.filter((bulletin) => bulletin.employeeId === employeeId)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCurrentActivity: (state) => {
      return (employeeId: number) => {
        const store = useStore()
        const bulletins = store.getBulletinsByEmployeeId(employeeId)
        if (!bulletins.length) return
        const lastBulletin = sortByDateDesc(bulletins, 'endDate')[0]
        const lastAppointment = sortByDateDesc(lastBulletin.appointments, 'date')[0]
        const activity = store.getActivity(lastAppointment.activityId)
        if (!activity) return
        return { ...activity, date: lastAppointment.date }
      }
    }
  },
  actions: {
    async sortEmployeesAsc() {
      const orderedEmployees = sortByNumberAsc(this.employees, 'id')
      this.employees = orderedEmployees
    },
    async sortEmployeesDesc() {
      const orderedEmployees = sortByNumberDesc(this.employees, 'id')
      this.employees = orderedEmployees
    },
    async searchEmployees(name: string) {
      this.employees = await getEmployees({ name })
    },
    async fetchEmployees() {
      if (!this.employees.length) {
        this.employees = await getEmployees()
      }
    },
    async fetchActivities() {
      if (!this.activities.length) {
        this.activities = await getActivities()
      }
    },
    async fetchEmployeeById(employeeId: number) {
      this.employee = await getEmployeeById(employeeId)
    },
    async fetchBulletins() {
      if (!this.bulletins.length) {
        this.bulletins = await getBulletins()
      }
    },
    async fetchBulletinsById(employeeId: number) {
      try {
        const bulletins = await getBulletins({ employeeId })
        const orderedBulletins = sortByDateDesc(bulletins, 'endDate')
        this.bulletinDetails = orderedBulletins.map((bulletin) => ({
          ...bulletin,
          appointments: sortByDateDesc(bulletin.appointments, 'date'),
          totalHours: calculateTotalHours(bulletin.startDate, bulletin.endDate)
        }))
      } catch (error) {
        this.bulletinDetails = []
      }
    }
  }
})
