
import dayjs from 'dayjs';

export default function monthGrouping(list:DayResult[]) {
  const result: MonthResult[] = [{
    month:list[0].day,
    monthTotal: {expense: 0, income: 0},
    monthItems: [list[0]]
  }];
  for (let i = 1; i < list.length; i++) {
    const current = list[i];
    const last = result[result.length - 1];
    if (dayjs(last.month).isSame(dayjs(current.day), 'month')) {
      last.monthItems.push(current);
    } else {
      result.push({
        month: dayjs(current.day).format('YYYY-MM'),
        monthTotal: {expense: 0, income: 0},
        monthItems: [current]
      });
    }
  }
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].monthItems.length; j++) {
      result[i].monthTotal.expense += result[i].monthItems[j].dayTotal.expense;
      result[i].monthTotal.income += result[i].monthItems[j].dayTotal.income;
    }
  }
return result
}