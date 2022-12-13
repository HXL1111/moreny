<template>
    <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import * as echarts from 'echarts';
  import {EChartsOption} from 'echarts/types/dist/echarts';

  @Component({
    components: {echarts}
  })
  export default class Chart extends Vue {
    @Prop() options?: EChartsOption;

    mounted(): void | Error {
      const myChart = echarts.init(this.$refs.wrapper as HTMLDivElement);
      if (this.options === undefined) {
        return new Error('options 不存在');
      } else {
        myChart.setOption(this.options);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 400px;
    }
</style>