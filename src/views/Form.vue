<template>
    <Layout>
        <div>
            <DateComponent @update:value="onUpdateMonth"/>
            <Chart :options="chartOptions" :is-radio="true" class="chart"
                   @update:type="onUpdateType"
                   :expense-class="type==='-'"
                   :income-class="type==='+'">
                <template v-slot:expense>
                    ￥{{currentMonthList[0]?.monthTotal?.expense||0}}
                </template>
                <template v-slot:income>
                    ￥{{currentMonthList[0]?.monthTotal?.income||0}}
                </template>
            </Chart>
        </div>
        <TagContent :tag-sort-list="tagSortList" :type="type">
            <template v-slot:text>
                <span>未发现账单哦，试着记一笔~</span>
            </template>
        </TagContent>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, ProvideReactive} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import DateComponent from '@/components/DateComponent.vue';
  import Chart from '@/components/Chart.vue';
  import {EChartsOption} from 'echarts/types/dist/echarts';
  import _sort from '@/lib/_sort';
  import dayGrouping from '@/lib/dayGrouping';
  import monthGrouping from '@/lib/monthGrouping';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import TagContent from '@/components/TagContent.vue';

  type TagItem = {
    tagName: string,
    amount: number,
    number: number,
    type: '-' | '+'
  }
  @Component({
    components: {TagContent, Chart, DateComponent, Layout}
  })
  export default class Form extends Vue {
    now: Date = new Date();
    type: '-' | '+' = '-';
    @ProvideReactive('isDateExist') isDateExist = true;

    onUpdateType(value: '-' | '+'): void {
      this.type = value;
      this.isDateExist = !!this.tagSortList[0];
    }

    onUpdateMonth(value: Date): void {
      this.now = value;
      this.isDateExist = !!this.tagSortList[0];
    }

    beforeCreated(): void {
      this.isDateExist = false;
    }

    created(): void {
      this.$store.commit('fetchRecord');
      this.isDateExist = !!this.tagSortList[0];
      console.log(this.isDateExist)
    }

    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    // eslint-disable-next-line no-undef
    get monthList(): MonthResult[] {
      const newList = _sort(this.recordList);
      if (newList.length === 0) {
        return [];
      }
      return monthGrouping(clone(dayGrouping(newList)));
    }

    // eslint-disable-next-line no-undef
    get currentMonthList(): MonthResult[] {
      const renderItem = clone(this.monthList).filter(item => dayjs(item.month).isSame(this.now, 'month'));
      if (!renderItem) {
        return [];
      } else {
        return renderItem;
      }
    }

    get tagSortList(): TagItem[] {
      if (this.currentMonthList[0]) {
        const currentMonthItem = clone(this.currentMonthList)[0].monthItems;
        if (currentMonthItem) {
          const array = [];
          for (let i = 0; i < currentMonthItem.length; i++) {
            for (let j = 0; j < currentMonthItem[i].dayItems.length; j++) {
              const currentTag = currentMonthItem[i].dayItems[j];
              const currentTagName = currentTag.tag[0].name;
              if (array.map(item => item?.tag[0].name).indexOf(currentTagName) >= 0) {
                const lastIndex = array.map(item => item?.tag[0].name).lastIndexOf(currentTagName);
                array.splice(lastIndex, 0, currentTag);
              } else {
                array.push(currentTag);
              }
            }
          }
          const newList = clone(array).filter(item => item.type === this.type);
          if (newList[0]) {
            const firstTagItem: TagItem = {
              tagName: newList[0].tag[0].name,
              amount: parseFloat(newList[0]?.notesAndAmount.amount),
              number: 1,
              type: this.type
            };
            const tags: TagItem[] = [firstTagItem];
            for (let k = 1; k < newList.length; k++) {
              const currentTagName = newList[k].tag[0].name;
              const lastTag = tags[tags.length - 1];
              if (currentTagName === lastTag.tagName) {
                lastTag.amount += parseFloat(newList[k].notesAndAmount.amount);
                lastTag.number += 1;
              } else {
                const currentTagItem = {
                  tagName: newList[k].tag[0].name,
                  amount: parseFloat(newList[k].notesAndAmount.amount),
                  number: 1,
                  type: this.type
                };
                tags.push(currentTagItem);
              }
            }
            return tags;
          }
        }
      }
      return [];
    }

    get chartDate(): { value: number, name: string }[] {
      return this.tagSortList.map(item => {
        return {value: item.amount, name: item.tagName};
      });
    }

    get chartOptions(): EChartsOption {
      return {
        grid: {
          top: '0'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> ￥{c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: this.chartDate,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>