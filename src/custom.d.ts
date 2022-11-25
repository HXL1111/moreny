
type Tag = {id:string ,name: string}

type RecordItem = {
  tag: Tag[]
  type: string
  notesAndAmount: { notes:string,amount:string }
  createAt?: string
}

