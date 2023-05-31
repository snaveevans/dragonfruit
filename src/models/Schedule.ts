export default interface Schedule {
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
