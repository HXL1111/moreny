<template>
    <div class="numberPad">
        <label class="notes">
            <input type="text"
                   placeholder="请输入备注信息（最多150字）"
                   v-model="notesValue">
            <span>{{outputValue}}</span>
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
            <button @click="save" class="save">保存</button>
            <button @click="makeAgain">再记</button>
            <button @click="inputContent">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';


  @Component
  export default class NumberPad extends Vue {
    notesValue = '';
    outputValue = '0';
    createAt = '';


    inputContent(event: MouseEvent): string | void {
      const input = (event.target as HTMLButtonElement).textContent as string;
      if (this.outputValue.length >= 8) { return window.alert('金额长度不能超过8位'); }
      if (this.outputValue === '0' && input !== '.') {
        this.outputValue = input;
      } else if (this.outputValue.indexOf('.') >= 0 && input === '.') {
        return;
      } else {
        this.outputValue += input;
      }
      return this.outputValue;
    }

    remove(): void {
      if (this.outputValue.length === 1) {
        this.outputValue = '0';
      } else {
        this.outputValue = this.outputValue.slice(0, -1);
      }
    }

    clear(): void {
      this.outputValue = '0';
    }

    createNewAt(): void {
      this.createAt = JSON.stringify(dayjs());
    }

    collectData(): void {
      this.$emit('update:notes', this.notesValue);
      this.$emit('update:amount', this.outputValue);
      this.createNewAt();
      this.$emit('update:createAt', this.createAt);
      this.notesValue = '';
      this.outputValue = '0';

    }

    save(): void {
      this.collectData();
      // this.$router.back();
    }

    makeAgain(): void {
      this.collectData();
    }
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