<template>
    <div class="chart_wrapper">
        <div class="amount">
            <span @click="expenseToggle"><span class="circle">
                <span :class="{selected:expenseClass}"></span></span>月支出
                <span class="expense"><slot name="expense"/></span></span>
            <span @click="incomeToggle"><span class="circle">
                <span :class="{selected:incomeClass}"></span></span>月收入
                <span class="income"><slot name="income"/></span></span>
        </div>
        <div v-show="this.isDataExist">
            <div class="chart" ref="chart"></div>
        </div>
        <div v-show="this.isDataExist===false" class="emptyContent">本月没有发现账单哦</div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, InjectReactive, Prop, Watch} from 'vue-property-decorator';
  import * as echarts from 'echarts';
  import {ECharts, EChartsOption} from 'echarts/types/dist/echarts';


  @Component({
    components: {echarts}
  })
  export default class Chart extends Vue {
    @Prop() options?: EChartsOption;
    @Prop() isRadio?: boolean;
    @Prop() expenseClass?: boolean;
    @Prop() incomeClass?: boolean;
    @InjectReactive('isDateExist') isDataExist!: boolean;

    chart?: ECharts;
    type: '-' | '+' = '-';
    expenseSelected = true;
    incomeSelected = false;

    expenseToggle(): void {
      if (this.isRadio === true) {
        this.type = '-';
        this.$emit('update:type', this.type);
      } else {
        this.expenseSelected = !this.expenseSelected;
        this.$emit('update:isShowExpense', {expenseSelected: this.expenseSelected});
      }
    }

    incomeToggle(): void {
      if (this.isRadio === true) {
        this.type = '+';
        this.$emit('update:type', this.type);
      } else {
        this.incomeSelected = !this.incomeSelected;
        this.$emit('update:isShowIncome', {incomeSelected: this.incomeSelected});
      }
    }
    created():void{
      if(!this.isDataExist){
        this.$emit('update:type', '+');
      }
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
        color: #FFFFFF;
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
        height: 300px;

        &_wrapper {
            background: #252525;
            margin: 0 16px 16px 16px;
            border-radius: 10px;
        }
    }

    .emptyContent {
        text-align: center;
        height: 140px;
        line-height: 140px;
        font-size: 12px;

    }

    .visible {
        display: none;
    }

</style>