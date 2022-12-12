import dayjs from 'dayjs';
export default function dayGrouping(list: RecordItem[]): DayResult {
  const result: DayResult = [{
    day: dayjs(list[0].createAt).format('YYYY-MM-DD'),
    dayTotal: {expense: 0, income: 0},
    dayItems: [list[0]]
  }];
  for (let i = 1; i < list.length; i++) {
    const current = list[i];
    const last = result[result.length - 1];
    if (dayjs(last.day).isSame(dayjs(current.createAt), 'day')) {
      last.dayItems.push(current);
    } else {
      result.push({
        day: dayjs(current.createAt).format('YYYY-MM-DD'),
        dayTotal: {expense: 0, income: 0},
        dayItems: [current]
      });
    }
  }
  for (let j = 0; j < result.length; j++) {
    for (let k = 0; k < result[j].dayItems.length; k++) {
      if (result[j].dayItems[k].type === '-') {
        result[j].dayTotal.expense += parseFloat(result[j].dayItems[k].notesAndAmount.amount);
      } else {
        result[j].dayTotal.income += parseFloat(result[j].dayItems[k].notesAndAmount.amount);
      }
    }
  }
  return result;
}