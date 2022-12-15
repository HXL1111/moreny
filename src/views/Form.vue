<template>
    <Layout>
        <div class="wrapper">
            <DateComponent @update:value="onUpdateMonth"/>
            <Chart :options="chartOptions" class="chart">
                <template v-slot:expense>
                    ￥{{currentMonthList[0]?.monthTotal?.expense||0}}
                </template>
                <template v-slot:income>
                    ￥{{currentMonthList[0]?.monthTotal?.income||0}}
                </template>
            </Chart>
        </div>
        <TagContent :render-list="currentMonthList[0]?.monthItems || []">
            <template v-slot:text>
                <span>未发现账单哦，试着记一笔~</span>
            </template>
        </TagContent>
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
  import TagContent from '@/components/TagContent.vue';

  type TagItem = {
    tagName: string,
    tagTotal: {
      expense: number,
      income: number
    },
    number: number
  }
  @Component({
    components: {TagContent, Chart, DateComponent, Layout}
  })
  export default class Form extends Vue {
    now: Date = new Date();

    onUpdateMonth(value: Date): void {
      this.now = value;
    }

    created(): void {
      this.$store.commit('fetchRecord');
      console.log('--------');
      console.log(this.tagSortList);
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

    get tagSortList(): TagItem[] {
      const currentMonthItem = clone(this.currentMonthList)[0].monthItems;
      if (currentMonthItem) {
        const array = [];
        for (let i = 0; i < currentMonthItem.length; i++) {
          for (let j = 0; j < currentMonthItem[i].dayItems.length; j++) {
            const currentTag = currentMonthItem[i].dayItems[j];
            const currentTagName = currentTag.tag[0].name;
            if (array.map(item => item?.tag[0].name).indexOf(currentTagName) >= 0) {
              const lastIndex = array.map(item => item?.tag[0].name).lastIndexOf(currentTagName);
              array.splice(lastIndex, 0, currentTag);
            } else {
              array.push(currentTag);
            }
          }
        }
        const firstTagItem: TagItem = {
          tagName: array[0].tag[0].name,
          tagTotal: {
            expense: 0,
            income: 0
          },
          number: 1
        };
        if (array[0].type === '-') {
          firstTagItem.tagTotal.expense = parseFloat(array[0].notesAndAmount.amount);
        } else {
          firstTagItem.tagTotal.income = parseFloat(array[0].notesAndAmount.amount);
        }
        const tags: TagItem[] = [firstTagItem];
        for (let k = 1; k < array.length; k++) {
          const currentTagName = array[k].tag[0].name;
          const lastTagItem = tags[tags.length - 1];
          if (currentTagName === lastTagItem.tagName) {
            if (array[k].type === '-') {
              lastTagItem.tagTotal.expense += parseFloat(array[k].notesAndAmount.amount);
            } else {
              lastTagItem.tagTotal.income += parseFloat(array[k].notesAndAmount.amount);
            }
            lastTagItem.number += 1;
          } else {
            const currentTagItem = {
              tagName: array[k].tag[0].name,
              tagTotal: {expense: 0, income: 0},
              number: 1
            };
            if (array[k].type === '-') {
              currentTagItem.tagTotal.expense = parseFloat(array[k].notesAndAmount.amount);
            } else {
              currentTagItem.tagTotal.income = parseFloat(array[k].notesAndAmount.amount);
            }
            tags.push(currentTagItem);
          }
        }
        return tags;
      }
      return [];
    }

    get chartOptions(): EChartsOption {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br> {b} ({d}%)'
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
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'El'},
              {value: 484, name: 'UC'},
              {value: 1048, name: 'A'},
              {value: 735, name: 'C'},
              {value: 580, name: 'Email'},
              {value: 484, name: 'Union Ads'},
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'El'},
              {value: 484, name: 'UC'},
              {value: 1048, name: 'A'},
              {value: 735, name: 'C'},
              {value: 580, name: 'Efil'},
              {value: 484, name: 'Union Ads'},
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Diect'},
              {value: 580, name: 'El'},
              {value: 484, name: 'UC'},
              {value: 1048, name: 'A'},
              {value: 735, name: 'C'},
              {value: 580, name: 'Eail'},
              {value: 484, name: 'Ucion Ads'},
              {value: 300, name: 'Video Ads'}
            ]
          }
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper {
        color: #FFFFFF;
    }

</style>