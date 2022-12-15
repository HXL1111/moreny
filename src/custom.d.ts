type Tag = { id: string, name: string }
type Total = { expense: number, income: number }
type RecordItem = {
  tag: Tag[]
  type: string
  notesAndAmount: { notes: string, amount: string }
  createAt?: string
}

type DayResult = {
  day: string,
  dayTotal: Total,
  dayItems: RecordItem[]
}

type MonthResult = {
  month: string,
  monthTotal: Total,
  monthItems: DayResult[]
}
