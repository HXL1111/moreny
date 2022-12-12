<template>
    <div class="content">
        <div class="threeDay">
            <slot/>
        </div>
        <div v-for="(group,index) in renderList " :key="index" class="mainContent">
            <div v-if="renderList[0].day" class="contentDiv">
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
            <div v-else class="contentDiv">
                <div class="content-wrapper">
                    <div class="dateAndMoney">
                        <span>{{group.month}}</span>
                        <span class="second">{{beautify(group.month) }}</span>
                    </div>
                    <div class="dateAndAmount">
                        <span>支:{{group.monthTotal.expense}}</span>
                        <span class="second"> 收:{{group.monthTotal.income}}</span>
                    </div>
                </div>
                <ol class="tagList">
                    <li v-for="item in group.monthItems" :key="item.id">
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
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class TagContent extends Vue {
    // eslint-disable-next-line no-undef
    @Prop() renderList?: DayResult[] | MonthResult[];

    // eslint-disable-next-line no-undef
    tagString(tag: Tag[]): string {
      return tag.length === 0 ? '无' : tag.map(t => t.name).join(',');
    }

    beautify(string: string): string | undefined{
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        const EName = day.format('dd');
        let CName = '';
        if (EName === 'Mo') {
          return CName = '星期一';
        } else if (EName === 'Tu') {
          return CName = '星期二';
        } else if (EName === 'We') {
          return CName = '星期三';
        } else if (EName === 'Th') {
          return CName = '星期四';
        } else if (EName === 'Fr') {
          return CName = '星期五';
        } else if (EName === 'Sa') {
          return CName = '星期六';
        } else if (EName === 'Su') {
          return CName = '星期日';
        }
        return CName;
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

        > .mainContent {
            > .contentDiv {
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
    }
</style>