<template>
    <div class="nav">
        <router-link to="/home">主页</router-link>
        |
        <router-link to="/bill">账单</router-link>
        |
        <router-link to="/form">
            <svg>
                <use xlink:href="#bill"/>
            </svg>
            报表</router-link>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
    import x from '@/assets/icons/right.svg'

  console.log(x);
  @Component
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>
    .nav{
        border: 1px solid red;
    }
</style>