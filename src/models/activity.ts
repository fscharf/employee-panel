export interface IActivity {
  id: number
  code: number
  description: string
  color: string
}

export interface ICurrentActivity extends IActivity {
  date: string
}
