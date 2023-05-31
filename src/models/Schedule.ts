export default interface Schedule {
  id: string
  interval: Interval
  variance: number[]
  regularity: number
}

export enum Interval {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}
