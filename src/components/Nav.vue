<template>
    <div>
        <router-link to="/home">主页</router-link>
        |
        <router-link to="/bill">账单</router-link>
        |
        <router-link to="/form">报表</router-link>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>