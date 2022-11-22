<template>
    <router-link to="home/money">
        <div class="makeAccount">
            <button>
                记一笔
            </button>
        </div>
    </router-link>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .makeAccount {
        text-align: center;
        padding: 14px 0;

        > button {
            padding: 14px 0;
            width: 90vw;
            color: $color-highLight;
            border: none;
            background: $color-background;
            border-radius: 16px;
        }
    }
</style>