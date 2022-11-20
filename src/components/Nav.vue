<template>
    <div class="nav">
        <router-link to="/home" class="item">
            <Icon name="home" />
            主页</router-link>

        <router-link to="/bill" class="item">
            <Icon name="bill" />
            账单</router-link>

        <router-link to="/form" class="item">
            <Icon name="form" />
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
        background: black;
        display: flex;
        font-size: 12px;
        padding-top: 8px ;
        padding-bottom: 12px;
        >.item{
            width: 33.33333%;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            >.icon{
                width: 32px;
                height: 32px;
            }
        }
    }
</style>