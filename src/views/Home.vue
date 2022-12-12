<template>
    <Layout>
        <AmountDisplay/>
        <router-link to="/home/money">
            <Button>记一笔</Button>
        </router-link>
        <TagContent :render-list="threeDayList" >
            近 3 日账单
        </TagContent>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import AmountDisplay from '@/components/AmountDisplay.vue';
  import Button from '@/components/Button.vue';
  import TagContent from '@/components/TagContent.vue';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {TagContent, Button, AmountDisplay, Layout}
  })
  export default class Home extends Vue {
    created(): void {
      this.$store.commit('fetchRecord');
    }
    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    // eslint-disable-next-line no-undef
    dayGrouping(newList: RecordItem[]): DayResult {
      // eslint-disable-next-line no-undef
      const result: DayResult = [{
        day: dayjs(newList[0].createAt).format('YYYY-MM-DD'),
        dayTotal: {expense: 0, income: 0},
        dayItems: [newList[0]]
      }];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
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
      return result;
    }

    // eslint-disable-next-line no-undef
    get dayGroupList(): DayResult {
      const newList = clone(this.recordList)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
      if (newList.length === 0) {
        return [];
      }
      const groupList = this.dayGrouping(newList);
      for (let i = 0; i < groupList.length; i++) {
        for (let j = 0; j < groupList[i].dayItems.length; j++) {
          if (groupList[i].dayItems[j].type === '-') {
            groupList[i].dayTotal.expense += parseFloat(groupList[i].dayItems[j].notesAndAmount.amount);
          } else {
            groupList[i].dayTotal.income += parseFloat(groupList[i].dayItems[j].notesAndAmount.amount);
          }
        }
      }
      return groupList;
    }
    // eslint-disable-next-line no-undef
    get threeDayList(): DayResult {
      const newList = clone(this.dayGroupList);
      return newList.filter(item => dayjs(item.day).isSame(dayjs(), 'day') || dayjs(item.day).isSame(dayjs().subtract(1, 'day'), 'day') || dayjs(item.day).isSame(dayjs().subtract(2, 'day'), 'day'));
    }

  }
</script>

<style lang="scss" scoped>

</style>