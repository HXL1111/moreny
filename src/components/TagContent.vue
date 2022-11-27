<template>
    <div class="content">
        <div class="threeDay">近3日账单</div>
        <div v-for="(group,index) in threeDayList " :key="index" class="content1">
            <div class="content-wrapper">
                <div class="dateAndMoney">
                    <span>{{group.day}}</span>
                    <span class="second">{{beautify(group.day) }}</span>
                </div>
                <div class="dateAndAmount">
                    <span>支:{{group.dayTotal.expense}}</span>
                    <span class="second"> 收:{{group.dayTotal.income}}</span>
                </div>
            </div>
            <ol class="tagList">
                <li v-for="item in group.dayItems" :key="item.id">
                    <div class="tag-wrapper">
                        <span class="logo">{{tagString(item.tag).slice(0,1)}}</span>
                        <div class="nameAndNotes">
                            <span class="name">{{tagString(item.tag)}}</span>
                            <span class="notes">{{item.notesAndAmount.notes}}</span>
                        </div>
                    </div>
                    <div class="money" :class="{red:item.type === '-',green:item.type === '+'}">
                        ￥{{item.notesAndAmount.amount}}
                    </div>
                </li>
            </ol>
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
  @Component
  export default class TagContent extends Vue {

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

    get threeDayList(): DayResult {
      const newList = clone(this.dayGroupList);
      return newList.filter(item => dayjs(item.day).isSame(dayjs(), 'day') || dayjs(item.day).isSame(dayjs().subtract(1, 'day'), 'day') || dayjs(item.day).isSame(dayjs().subtract(2, 'day'), 'day'));
    }


    created(): void {
      this.$store.commit('fetchRecord');
    }

    // eslint-disable-next-line no-undef
    tagString(tag: Tag[]): string {
      return tag.length === 0 ? '无' : tag.map(t => t.name).join(',');
    }

    beautify(string: string): string {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }
  }

</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";


    .content {
        padding: 0 18px;

        > .threeDay {
            color: $color-highLight;
            padding-bottom: 14px;
        }

        > .content1 {

            > .content-wrapper {
                font-size: 10px;
                color: #7d7c80;
                display: flex;
                justify-content: space-between;
                padding-top: 4px;
                padding-bottom: 10px;

                > .dateAndMoney {
                    > .second {
                        padding-left: $leftPadding;
                    }
                }

            }

            > .tagList {
                > li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;

                    > .tag-wrapper {
                        display: flex;
                        align-items: center;
                        color: $color-highLight;


                        %font {
                            width: 38px;
                            height: 38px;
                            line-height: 38px;
                        }

                        > .logo {
                            background: #515151;
                            text-align: center;
                            font-size: 15px;
                            @extend %font;
                            border-radius: 50%;
                        }

                        > .nameAndNotes {
                            padding-left: 12px;
                            display: flex;
                            flex-direction: column;

                            > .notes {
                                transform: scale(0.9);
                                font-size: 12px;
                                color: #c6c6c6;
                            }
                        }
                    }

                    > .money {
                        &.red {
                            color: #d75b5a;
                        }

                        &.green {
                            color: #539f76;
                        }
                    }
                }
            }
        }
    }
</style>