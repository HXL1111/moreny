import clone from '@/lib/clone';
import dayjs from 'dayjs';

export default function _sort(list: RecordItem[]) {
  return clone(list)
    .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

}
