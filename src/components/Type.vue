<template>
    <div class="type-wrapper">
        <div class="none"></div>
        <div class="type">
            <span :class="{selected: type === '-'}"
                  @click="selectType('-')">支出</span>
            <span :class="{selected: type === '+'}"
                  @click="selectType('+')">收入</span>
        </div>
        <div class="cancel">取消</div>
    </div>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Type extends Vue {
    type = '-';

    selectType(type: string) : string{
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      return this.type = type;
    }
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .type-wrapper {
        height: 58px;
        > .none {
            width: 28px;
            height: 19px;
        }

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px;
        color: $color-highLight;

        > .type {


            > span {
                padding: 10px 20px;
                border-radius: 20px;

                &.selected {

                    background: #cdcabb;

                }
            }
        }

        .cancel {


        }
    }

</style>