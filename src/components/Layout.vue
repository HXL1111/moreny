<template>
        <div class="nav-wrapper">
            <div class="tag-wrapper">
                <slot/>
            </div>
            <Nav/>
        </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Layout extends Vue {

  }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        > .tag-wrapper {
            overflow: auto;
            flex-grow: 1;
        }
    }
</style>