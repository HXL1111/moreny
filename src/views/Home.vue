<template>
    <Layout>
        <div class="head">
            <div class="expense">
                每月支出(元)
            </div>
            <div class="expenseNumber">
                ￥2016.00
            </div>
            <div class="head-foot">
                <div class="head-foot-wrapper">
                    <span class="income">本月收入</span>
                    <span class="incomeNumber">300.00</span>
                </div>
                <div class="head-foot-wrapper">
                    <span class="total">月结余</span>
                    <span class="totalNumber">-1860.00</span>
                </div>
            </div>

        </div>
        <div class="makeNotes">
            <button>
                记一笔
            </button>
        </div>

        <div class="body">
            <div class="threeDay">近3日账单</div>
            <div class="content-wrapper">
                <div class="x">
                    <span>11月19日</span>
                    <span class="second">今天</span>
                </div>
                <div class="x">
                    <span>支：2016.00</span>
                    <span class="second">收：300.00</span>
                </div>
            </div>
            <ol class="content">
                <li>
                    <div class="tag">
                        <span class="logo">衣</span>
                        <span class="name">衣服</span>
                    </div>
                    <div class="money">￥300.00</div>
                </li>
            </ol>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';

  @Component({
    components: {Layout}
  })
  export default class Home extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .head {

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

        > .head-foot {
            display: flex;

            > .head-foot-wrapper {
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

    .makeNotes {
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

    .body {

        padding: 0 18px;

        > .threeDay {
            color: $color-highLight;
            padding-bottom: 14px;
        }

        flex-grow: 1;

        > .content-wrapper {
            font-size: 10px;
            color: #7d7c80;
            display: flex;
            justify-content: space-between;
            padding: 10px 0;

            > .x {
                > .second {
                    padding-left: $leftPadding;
                }
            }

        }

        > .content {
            > li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                > .tag {
                    display: flex;
                    align-items: center;
                    color: $color-highLight;
                    %font{
                        width: 38px;
                        height: 38px;
                        line-height: 38px;
                    }
                    > .logo {
                        background: #515151;
                        text-align: center;
                        font-size: 15px;
                        @extend %font;
                        border-radius: 50%;
                    }
                    > .name{
                        @extend %font;
                        padding-left: $leftPadding;
                    }
                }
                > .money {

                }

            }


        }
    }
</style>