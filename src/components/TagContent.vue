<template>
    <div class="content">
        <div class="threeDay">近3日账单</div>
        <div v-for="(group,index) in threeDayList " :key="index" class="content1">
            <div class="content-wrapper">
                <div class="dateAndMoney">
                    <span>{{group.title}}</span>
                    <span class="second">{{beautify(group.title) }}</span>
                </div>
                <div class="dateAndAmount">
                    <span>支：2016.00</span>
                    <span class="second">收：300.00</span>
                </div>
            </div>
            <ol class="tagList">
                <li v-for="item in group.items" :key="item.id">
                    <div class="tag-wrapper">
                        <span class="logo">{{tagString(item.tag).slice(0,1)}}</span>
                        <div class="nameAndNotes">
                            <span class="name">{{tagString(item.tag)}}</span>
                            <span class="notes">{{item.notesAndAmount.notes}}</span>
                        </div>
                    </div>
                    <div class="money">￥{{item.notesAndAmount.amount}}</div>
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
  type Result = { title: string, total?: number, items: RecordItem[] }[]

  @Component
  export default class TagContent extends Vue {

    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    get dayGroupList(): Result {
      const newList = clone(this.recordList)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
      if (newList.length === 0) {
        return [];
      }
      const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
        }
      }

      return result;
    }

    get threeDayList() :Result{
      const newList = clone(this.dayGroupList)
      return newList.filter(item => dayjs(item.title).isSame(dayjs(), 'day') || dayjs(item.title).isSame(dayjs().subtract(1, 'day'), 'day') || dayjs(item.title).isSame(dayjs().subtract(2, 'day'), 'day'));
    }
    // get expenseList() {
    //   const newList = clone(this.groupList);
    //   return newList;
    // }

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

                    }
                }
            }
        }
    }
</style>