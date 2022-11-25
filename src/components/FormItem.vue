<template>
    <label class="formItem">
        <input type="text"
               :placeholder="placeholder"
               @change="onValueChange($event.target.value)"
               :value="value">
        <slot/>
    </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';


  @Component
  export default class FormItem extends Vue {
    @Prop({required: true}) placeholder!: string;
    @Prop({default:''}) value!:string

    onValueChange(value:string):void{
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .formItem {
        display: flex;
        padding-left: 12px;

        > input {
            padding: 18px 0;
            flex-grow: 1;
            background: transparent;
            border: none;
            color: $color-highLight;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
        }

    }
</style>