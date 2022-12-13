<template>
    <Layout>
        <div class="wrapper">
            <DateComponent @update:value="onUpdateMonth"/>
            <div class="chart_wrapper">
                <div class="amount">
                    <span>月支出 <span class="expense">￥{{renderList.monthTotal.expense }}</span></span>
                    <span>月收入 <span class="income">￥{{renderList.monthTotal.income }}</span></span>
                </div>
                <Chart class="chart" :options="chartOptions"/>
            </div>
        </div>
        <TagContent :render-list="renderList.monthItems">
            账单明细
        </TagContent>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
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

    onUpdateMonth(value: Date): void {
      this.now = value;
    }

    created(): void {
      this.$store.commit('fetchRecord');

    }

    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    // eslint-disable-next-line no-undef
    get dayList(): DayResult[] {
      const newList = _sort(this.recordList);
      if (newList.length === 0) {
        return [];
      }
      return dayGrouping(newList);
    }

    // eslint-disable-next-line no-undef
    get monthList(): MonthResult[] {
      if (this.dayList.length === 0) {
        return [];
      }
      return monthGrouping(clone(this.dayList));
    }

    // eslint-disable-next-line no-undef
    get renderList(): MonthResult | undefined {
      const renderItem = clone(this.monthList).filter(item => dayjs(item.month).isSame(this.now, 'month'));
      if (!renderItem) {
        return undefined;
      } else {
        return renderItem[0];
      }
    }
    get keyValueList():{key: string, value: {expense: number, income: number}}[]{
      const firstDay = dayjs(this.now).subtract(dayjs(this.now).get('date') - 1, 'day');
      const array = [];
      for (let i = 0; i < dayjs(this.now).daysInMonth(); i++) {
        const dateString = dayjs(firstDay).add(i, 'day').format('YYYY-MM-DD');
        const found = this.renderList?.monthItems.find(item => item.day === dateString);
        array.push({key: dateString, value: found ? found.dayTotal : {expense: 0, income: 0}});
      }
      return array
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
            color: '#ef5155'
          },
          data: expenseValues,
        },
          {
            name: '收入',
            type: 'bar',

            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: '#509e6e'
            },
            data: incomeValues,
          },

        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
    .amount {
        padding: 12px 12px 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        > span {
            > .expense {
                color: #ef5155;
            }

            > .income {
                color: #509e6e;
            }
        }
    }

    .chart {
        height: 160px;

        &_wrapper {
            background: #252525;
            margin: 16px;
            border-radius: 10px;
        }
    }

    .wrapper {
        color: #FFFFFF;
    }
</style>