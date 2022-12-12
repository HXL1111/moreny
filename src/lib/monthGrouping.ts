
import dayjs from 'dayjs';

export default function monthGrouping(list:DayResult) {
  const result: MouthResult = [{
    mouth:list[0].day,
    mouthTotal: {expense: 0, income: 0},
    mouthItems: [list[0]]
  }];
  for (let i = 1; i < list.length; i++) {
    const current = list[i];
    const last = result[result.length - 1];
    if (dayjs(last.mouth).isSame(dayjs(current.day), 'month')) {
      last.mouthItems.push(current);
    } else {
      result.push({
        mouth: dayjs(current.day).format('YYYY-MM'),
        mouthTotal: {expense: 0, income: 0},
        mouthItems: [current]
      });
    }
  }
return result
}