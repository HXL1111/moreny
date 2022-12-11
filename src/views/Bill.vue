<template>
    <Layout>
        <DateComponent/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import DateComponent from '@/views/DateComponent.vue';
  @Component({
    components: {DateComponent, Layout}
  })
  export default class Bill extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>