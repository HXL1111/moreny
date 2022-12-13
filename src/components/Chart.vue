<template>
    <div class="chart_wrapper">
        <div class="amount">
            <span @click="expenseToggle"><span class="circle"><span :class="{selected:expenseSelected}"></span></span>月支出 <span
                    class="expense"><slot name="expense"/></span></span>
            <span @click="incomeToggle"><span class="circle"><span :class="{selected:incomeSelected}"></span></span>月收入 <span
                    class="income"><slot
                    name="income"/></span></span>
        </div>
        <div class="chart" ref="chart"></div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import * as echarts from 'echarts';
  import {ECharts, EChartsOption} from 'echarts/types/dist/echarts';

  @Component({
    components: {echarts}
  })
  export default class Chart extends Vue {
    @Prop() options?: EChartsOption;
    chart?: ECharts;
    expenseSelected = true;
    incomeSelected = false;

    expenseToggle(): void {
      this.expenseSelected = !this.expenseSelected;

    }

    incomeToggle(): void {
      this.incomeSelected = !this.incomeSelected;
    }

    mounted(): void | Error {
      if (this.options === undefined) {
        return new Error('options 不存在');
      } else {
        this.chart = echarts.init(this.$refs.chart as HTMLDivElement);
        this.chart.setOption(this.options);
      }
    }

    @Watch('options')
    onOptionsChange(newValue: EChartsOption): void {
      this.chart?.setOption(newValue);
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
            display: flex;
            justify-content: center;
            align-items: center;

            > .circle {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 10px;
                height: 10px;
                border: 1px solid white;
                border-radius: 50%;

                > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    &.selected {
                        background: white;
                    }
                }
            }

            > .expense {
                color: #ef5155;
            }

            > .income {
                color: #509e6e;
            }
        }
    }

    .chart {
        height: 400px;

        &_wrapper {
            background: #252525;
            margin: 0 16px 16px 16px;
            border-radius: 10px;
        }
    }
</style>