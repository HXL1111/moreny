type Tag = { id: string, name: string }

type RecordItem = {
  tag: Tag[]
  type: string
  notesAndAmount: { notes: string, amount: string }
  createAt?: string
}

type DayResult = {
  day: string,
  dayTotal: { expense: number, income: number },
  dayItems: RecordItem[]
}[]

type MouthResult = {
  mouth: string,
  mouthTotal: { expense: number, income: number },
  mouthItems: DayResult
}[]