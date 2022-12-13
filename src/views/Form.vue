<template>
    <Layout>
        <div class="wrapper">
            <DateComponent/>
            <Chart :options="chartOptions"/>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import DateComponent from '@/components/DateComponent.vue';
  import Chart from '@/components/Chart.vue';
  import {EChartsOption} from 'echarts/types/dist/echarts';
  @Component({
    components: {Chart, DateComponent, Layout}
  })
  export default class Form extends Vue {
    get chartOptions(): EChartsOption {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
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
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper{
        color: #FFFFFF;
    }
</style>