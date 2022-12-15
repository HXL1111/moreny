<template>
        <div class="makeAccount" @click="$emit('click',$event)">
            <button >
                <slot/>
            </button>
        </div>
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
        margin: 0 14px;
        > button {
            padding: 14px 0;
            width: 100%;
            color: $color-highLight;
            border: none;
            background: $color-background;
            border-radius: 16px;
        }
    }
</style>