<template>
    <div class="numberPad">
        <label class="notes">
            <input type="text"
                   placeholder="请输入备注信息（最多150字）"
                   v-model="value">
            <span>{{output}}</span>
        </label>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button class="save">保存</button>
            <button >再记</button>
            <button @click="inputContent">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';


  @Component
  export default class NumberPad extends Vue {
    value = '';
    output = '0';


    inputContent(event: MouseEvent): string | void {
      const input = (event.target as HTMLButtonElement).textContent as string;
      if (this.output.length >= 8) { return window.alert('金额长度不能超过8位'); }
      if (this.output === '0' && input !== '.') {
        this.output = input;
      } else if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      } else {
        this.output += input;
      }
      return this.output;
    }

    remove():void{
      if(this.output.length === 1){
        this.output = '0'
      }else {
        this.output = this.output.slice(0,-1)
      }
    }

    clear():void{
      this.output = '0'
    }

    // save(){
    //
    // }
    //
    // makeAgain(){
    //
    // }
  }

</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .numberPad {
        height: 308px;

        > .notes {
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

            > span {
                padding: 0 12px;
                text-align: center;
                line-height: 52px;
                font-size: 24px;
                color: $color-highLight;
            }
        }

        > .buttons {
            border-radius: 30px 30px 0 0;
            background: $color-background;

            @extend %clearFix;

            > button {
                width: 25%;
                min-height: 64px;
                float: left;
                border: none;
                background: transparent;
                color: $color-highLight;

                &.save {
                    min-height: 2*64px;
                    float: right;
                }
            }
        }
    }
</style>