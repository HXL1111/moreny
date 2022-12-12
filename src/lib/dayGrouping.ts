import dayjs from 'dayjs';

export default function dayGrouping(list:RecordItem[]){
  const dayResult: DayResult[] = [{
    day: dayjs(list[0].createAt).format('YYYY-MM-DD'),
    dayTotal: {expense: 0, income: 0},
    dayItems: [list[0]]
  }];
    for (let i = 1; i < list.length; i++) {
      const current = list[i];
      const last = dayResult[dayResult.length - 1];
      if (dayjs(last.day).isSame(dayjs(current.createAt), 'day')) {
        last.dayItems.push(current);
      } else {
        dayResult.push({
          day: dayjs(current.createAt).format('YYYY-MM-DD'),
          dayTotal: {expense: 0, income: 0},
          dayItems: [current]
        });
      }
    }
    for (let j = 0; j < dayResult.length; j++) {
      for (let k = 0; k < dayResult[j].dayItems.length; k++) {
        if (dayResult[j].dayItems[k].type === '-') {
          dayResult[j].dayTotal.expense += parseFloat(dayResult[j].dayItems[k].notesAndAmount.amount);
        } else {
          dayResult[j].dayTotal.income += parseFloat(dayResult[j].dayItems[k].notesAndAmount.amount);
        }
      }
    }

  return dayResult;
}