<template>
    <div class="content">
        <div class="threeDay">近3日账单</div>
        <div class="content-wrapper">
            <div class="dateAndMoney">
                <span>11月19日</span>
                <span class="second">今天</span>
            </div>
            <div class="dateAndAmount">
                <span>支：2016.00</span>
                <span class="second">收：300.00</span>
            </div>
        </div>
        <ol class="tagList">
            <li>
                <div class="tag">
                    <span class="logo">衣</span>
                    <span class="name">衣服</span>
                </div>
                <div class="money">￥300.00</div>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Content extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";


    .content {

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

            > .dateAndMoney {
                > .second {
                    padding-left: $leftPadding;
                }
            }

        }

        > .tagList {
            > li {
                display: flex;
                justify-content: space-between;
                align-items: center;

                > .tag {
                    display: flex;
                    align-items: center;
                    color: $color-highLight;

                    %font {
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

                    > .name {
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