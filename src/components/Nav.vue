<template>
    <div class="nav">
        <router-link to="/home">
            <Icon name="home"/>
            主页</router-link>
        |
        <router-link to="/bill">
            <Icon name="bill"/>
            账单</router-link>
        |
        <router-link to="/form">
            <Icon name="form"/>
            报表
        </router-link>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>
    .nav {
        border: 1px solid red;
        background: black;
    }
</style>