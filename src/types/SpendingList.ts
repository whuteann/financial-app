export type SpendingTab = {
  amount: number,
  description: string,
  created_date: string,
  created_at: Date,
  created_day: string,
}

export type SpendingList = {
  user_id: string,
  month: string,
  year: number,
  amount: number,
}