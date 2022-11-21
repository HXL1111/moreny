<template>
    <div class="amountDisplay">
        <div class="expense">
            每月支出(元)
        </div>
        <div class="expenseNumber">
            ￥2016.00
        </div>
        <div class="incomeAndTotal">
            <div class="incomeAndTotal-wrapper">
                <span class="income">本月收入</span>
                <span class="incomeNumber">300.00</span>
            </div>
            <div class="incomeAndTotal-wrapper">
                <span class="total">月结余</span>
                <span class="totalNumber">-1860.00</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class amountDisplay extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .amountDisplay {

        %numberStyle {
            padding-left: $leftPadding;
            color: $color-highLight;
        }

        background: $color-background;
        padding: 32px 18px;
        border-radius: 0 0 30px 30px;

        > .expense {
        }

        > .expenseNumber {
            font-size: 36px;
            padding-top: 8px;
            padding-bottom: 14px;
            @extend %numberStyle
        }

        > .incomeAndTotal {
            display: flex;

            > .incomeAndTotal-wrapper {
                width: 50%;

                > .income {
                }


                > .incomeNumber {
                    @extend %numberStyle
                }

                > .total {
                }

                > .totalNumber {
                    @extend %numberStyle
                }
            }
        }
    }
</style>