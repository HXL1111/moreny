<template>
    <Layout>
        <div class="wrapper">
            <DateComponent @update:value="onUpdateMonth" />
            <Chart :options="chartOptions" class="chart">
                <template v-slot:expense>
                    ￥{{renderList[0]?.monthTotal?.expense||0}}
                </template>
                <template v-slot:income>
                    ￥{{renderList[0]?.monthTotal?.income||0}}
                </template>
            </Chart>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import DateComponent from '@/components/DateComponent.vue';
  import Chart from '@/components/Chart.vue';
  import {EChartsOption} from 'echarts/types/dist/echarts';
  import _sort from '@/lib/_sort';
  import dayGrouping from '@/lib/dayGrouping';
  import monthGrouping from '@/lib/monthGrouping';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  @Component({
    components: {Chart, DateComponent, Layout}
  })
  export default class Form extends Vue {
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
    get renderList(): MonthResult[] {
      const renderItem = clone(this.monthList).filter(item => dayjs(item.month).isSame(this.now, 'month'));
      if (!renderItem) {
        return [];
      } else {
        return renderItem;
      }
    }
    get chartOptions(): EChartsOption {
      return {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'El' },
              { value: 484, name: 'UC' },
              { value: 1048, name: 'A' },
              { value: 735, name: 'C' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'El' },
              { value: 484, name: 'UC' },
              { value: 1048, name: 'A' },
              { value: 735, name: 'C' },
              { value: 580, name: 'Efil' },
              { value: 484, name: 'Union Ads' },
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Diect' },
              { value: 580, name: 'El' },
              { value: 484, name: 'UC' },
              { value: 1048, name: 'A' },
              { value: 735, name: 'C' },
              { value: 580, name: 'Eail' },
              { value: 484, name: 'Ucion Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper{
        color: #FFFFFF;
    }

</style>