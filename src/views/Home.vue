<template>
    <Layout class="layout">
        <AmountDisplay/>
        <router-link to="/home/money">
            <Button>记一笔</Button>
        </router-link>
        <TagContent :render-list="threeDayList">
            <template v-slot:title>
                近 3 日账单
            </template>
            <template v-slot:text>
                <span>三日内未发现账单哦，试着记一笔~</span>
                <span>底部账单页面查看历史账单哦~</span>
            </template>
        </TagContent>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import AmountDisplay from '@/components/AmountDisplay.vue';
  import Button from '@/components/Button.vue';
  import TagContent from '@/components/TagContent.vue';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import _sort from '@/lib/_sort';
    import dayGrouping from '@/lib/dayGrouping';
  @Component({
    components: {TagContent, Button, AmountDisplay, Layout}
  })
  export default class Home extends Vue {
    created(): void {
      this.$store.commit('fetchRecord');
    }
    // eslint-disable-next-line no-undef
    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }
    // eslint-disable-next-line no-undef
    get threeDayList(): DayResult[] {
      const newList = _sort(this.recordList)
      if (newList.length === 0) {
        return [];
      }
      return clone(dayGrouping(newList)).filter(item => dayjs(item.day).isSame(dayjs(), 'day') || dayjs(item.day).isSame(dayjs().subtract(1, 'day'), 'day') || dayjs(item.day).isSame(dayjs().subtract(2, 'day'), 'day'));
    }
  }
</script>

<style lang="scss" scoped>
.layout{
    overflow: auto;
}
</style>