<template>
    <Layout>
        <div class="wrapper">
            <DateComponent @update:value="onUpdateMonth" class="month"/>
            <Chart class="chart" :options="chartOptions"
                   @update:isShowExpense="onUpdateExpense"
                   @update:isShowIncome="onUpdateIncome"
                   :expense-class="Boolean(expenseVisible)"
                   :income-class="Boolean(incomeVisible)">
                <template v-slot:expense>
                    ￥{{currentMonthList[0]?.monthTotal?.expense||0}}
                </template>
                <template v-slot:income>
                    ￥{{currentMonthList[0]?.monthTotal?.income||0}}
                </template>
            </Chart>
        </div>
        <TagContent :render-list="currentMonthList[0]?.monthItems || []">
            <template v-slot:title>
                账单明细
            </template>
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
  import Histogram from '@/components/Chart.vue';
  import {EChartsOption} from 'echarts/types/dist/echarts';
  import TagContent from '@/components/TagContent.vue';
  import DateComponent from '@/components/DateComponent.vue';
  import _sort from '@/lib/_sort';
  import dayGrouping from '@/lib/dayGrouping';
  import clone from '@/lib/clone';
  import monthGrouping from '@/lib/monthGrouping';
  import dayjs from 'dayjs';
  import Chart from '@/components/Chart.vue';

  @Component({
    components: {Chart, TagContent, Histogram, DateComponent, Layout}
  })
  export default class Bill extends Vue {
    now: Date = new Date();
    expenseVisible: 0 | 1 = 1;
    incomeVisible: 0 | 1 = 1;
    @ProvideReactive('isDateExist') isDateExist = true;

    onUpdateExpense(value: { expenseSelected: boolean }): void {
      if (value.expenseSelected) {
        this.expenseVisible = 1;
      } else {
        this.expenseVisible = 0;
      }
    }

    onUpdateIncome(value: { incomeSelected: boolean }): void {
      if (value.incomeSelected) {
        this.incomeVisible = 1;
      } else {
        this.incomeVisible = 0;
      }
    }

    onUpdateMonth(value: Date): void {
      this.now = value;
      this.isDateExist = !!this.currentMonthList[0];
    }

    beforeCreated(): void {
      this.isDateExist = false;
    }

    created(): void {
      this.$store.commit('fetchRecord');
      this.isDateExist = !!this.currentMonthList[0];
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

    get keyValueList(): { key: string, value: { expense: number, income: number } }[] {
      const firstDay = dayjs(this.now).subtract(dayjs(this.now).get('date') - 1, 'day');
      const array = [];
      for (let i = 0; i < dayjs(this.now).daysInMonth(); i++) {
        const dateString = dayjs(firstDay).add(i, 'day').format('YYYY-MM-DD');
        const found = this.currentMonthList[0]?.monthItems.find(item => item.day === dateString);
        array.push({key: dateString, value: found ? found.dayTotal : {expense: 0, income: 0}});
      }
      return array;
    }

    get chartOptions(): EChartsOption {
      const keys = this.keyValueList.map(item => dayjs(item.key).format('D日'));
      const expenseValues = this.keyValueList.map(item => item.value.expense);
      const incomeValues = this.keyValueList.map(item => item.value.income);
      return {
        grid: {
          height: '130px',
          top: '0',
          bottom: '10px',
          left: '10px',
          right: '10px'
        },
        tooltip: {},
        xAxis: {
          data: keys,
          alignTicks: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          },
          axisLabel: {
            show: true,
            interval: 6,
            color: '#3f3f3f',
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          name: '支出',
          type: 'bar',
          barGap: '100%',
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: '#ef5155',
            opacity: this.expenseVisible
          },
          data: expenseValues,
        },
          {
            name: '收入',
            type: 'bar',
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: '#509e6e',
              opacity: this.incomeVisible
            },
            data: incomeValues,
          },
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>

    .chart {
        height: 190px;
    }

    .wrapper {
        color: #FFFFFF;
        position: relative;

        > .month {
            position: sticky;
            top: 0;
            z-index: 100;
        }
    }
</style>