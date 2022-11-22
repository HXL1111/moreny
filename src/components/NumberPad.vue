<template>
    <div class="numberPad">
        <label class="notes">
            <input type="text" placeholder="请输入备注信息（最多150字）">
            <span>10000000.00</span>
        </label>
        <div class="buttons">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>删除</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>清空</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button class="save">保存</button>
            <button>再记</button>
            <button>0</button>
            <button>.</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .numberPad{
        height: 308px;
        >.notes{
           display: flex;
            padding-left: 12px;
            >input{
                padding: 18px 0 ;
                flex-grow: 1;
                background: transparent;
                border: none;
                color: $color-highLight;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
            }
            >div{
                padding: 0 12px;
                text-align: center;
                line-height: 52px;
                font-size: 24px;
                color: $color-highLight;
            }
        }
        >.buttons{
            border-radius: 30px 30px 0 0;
            background: $color-background;

            @extend %clearFix;
            >button{
                width: 25%;
                min-height: 64px;
                float: left;
                border: none;
                background: transparent;
                color: $color-highLight;
                &.save{
                    min-height: 2*64px;
                    float: right;
                }
            }
        }
    }
</style>