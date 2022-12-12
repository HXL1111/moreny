<template>
    <Layout>
        <div class="wrapper">
            <DateComponent/>
            <div class="histogramChart_wrapper">
                <div class="amount">
                    <span>月支出 <span class="expense">￥1111</span></span>
                    <span>月收入 <span class="income">￥111</span></span>
                </div>
                <Histogram class="histogramChart" :options="chartOptions"/>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import DateComponent from '@/views/DateComponent.vue';
  import Histogram from '@/components/Histogram.vue';
  import {EChartsOption} from 'echarts/types/dist/echarts';

  @Component({
    components: {Histogram, DateComponent, Layout}
  })
  export default class Bill extends Vue {
    get chartOptions(): EChartsOption {
      return {
        grid: {
          height: '130px',
          top: '0',
          bottom: '10px',
          left: '10px',
          right: '10px'
        },
        xAxis: {
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
          ],
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
            color: '#3f3f3f'
          },
        },
        yAxis: {
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
          data: [5, 20, 36, 10, 10, 20],
        },
          {
            name: '收入',
            type: 'bar',

            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: '#509e6e'
            },
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20,],
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

        > span {
            > .expense {
                color: #ef5155;
            }

            > .income {
                color: #509e6e;
            }
        }
    }

    .histogramChart {
        height: 160px;

        &_wrapper {

            background: #252525;
            margin: 16px;
            border-radius: 10px;
        }
    }
.wrapper{
    color: #FFFFFF;

}
</style>