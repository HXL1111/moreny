<template>
    <div>
        <div>你访问的页面不存在</div>
        <router-link to="/home">返回主页</router-link>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NotFound extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>