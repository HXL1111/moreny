<template>
    <div class="amountDisplay">
        <div v-if="currentMouthGroup" class="for">
            <div class="expense">
                每月支出(元)
            </div>
            <div class="expenseNumber">
                ￥{{this.currentMouthGroup.mouthTotal.expense}}
            </div>
            <div class="incomeAndTotal">
                <div class="incomeAndTotal-wrapper">
                    <span class="income">本月收入</span>
                    <span class="incomeNumber">{{this.currentMouthGroup.mouthTotal.income}}</span>
                </div>
                <div class="incomeAndTotal-wrapper">
                    <span class="total">月结余</span>
                    <span class="totalNumber">{{this.currentMouthGroup.mouthTotal.income - this.currentMouthGroup.mouthTotal.expense}}</span>
                </div>
            </div>
        </div>
        <div v-else class="for">
            <div class="expense">
                每月支出(元)
            </div>
            <div class="expenseNumber">
                ￥0
            </div>
            <div class="incomeAndTotal">
                <div class="incomeAndTotal-wrapper">
                    <span class="income">本月收入</span>
                    <span class="incomeNumber">0</span>
                </div>
                <div class="incomeAndTotal-wrapper">
                    <span class="total">月结余</span>
                    <span class="totalNumber">0</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  // eslint-disable-next-line no-undef
  type DayResult = { day: string, dayTotal: { expense: number, income: number }, dayItems: RecordItem[] }[]
  type MouthResult = { mouth: string, mouthTotal: { expense: number, income: number }, mouthItems: DayResult }[]
  @Component
  export default class amountDisplay extends Vue {

    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    // eslint-disable-next-line no-undef
    dayGrouping(newList: RecordItem[]): DayResult {
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

    mouthGrouping(dayResult: DayResult): MouthResult {
      const result: MouthResult = [{
        mouth: dayjs(dayResult[0].day).format('YYYY-MM'),
        mouthTotal: {expense: 0, income: 0},
        mouthItems: [dayResult[0]]
      }];
      for (let i = 1; i < dayResult.length; i++) {
        const current = dayResult[i];
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
      return result;
    }

    get mouthGroupList(): MouthResult {
      const newList = clone(this.dayGroupList);
      if (newList.length === 0) {
        return [];
      }
      const groupList = this.mouthGrouping(newList);
      for (let i = 0; i < groupList.length; i++) {
        for (let j = 0; j < groupList[i].mouthItems.length; j++) {
            groupList[i].mouthTotal.expense += groupList[i].mouthItems[j].dayTotal.expense;
            groupList[i].mouthTotal.income += groupList[i].mouthItems[j].dayTotal.income;
        }
      }
      return groupList;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    get currentMouthGroup(){
      let currentMouthGroup
      for(let i =0;i<this.mouthGroupList.length;i++){
        if(dayjs(this.mouthGroupList[i].mouth).isSame(dayjs(),'month')){
          currentMouthGroup = this.mouthGroupList[i]
        }
      }
      return currentMouthGroup
    }

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .amountDisplay {
        > .for {
            %numberStyle {
                padding-left: $leftPadding;
                color: $color-highLight;
            }

            background: $color-background;
            padding: 32px 18px;
            border-radius: 0 0 30px 30px;

            > .expense {
            }

            > .expenseNumber {
                font-size: 36px;
                padding-top: 8px;
                padding-bottom: 14px;
                @extend %numberStyle
            }

            > .incomeAndTotal {
                display: flex;

                > .incomeAndTotal-wrapper {
                    width: 50%;

                    > .income {
                    }

                    > .incomeNumber {
                        @extend %numberStyle
                    }

                    > .total {
                    }

                    > .totalNumber {
                        @extend %numberStyle
                    }
                }
            }
        }
    }
</style>