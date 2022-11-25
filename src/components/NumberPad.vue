<template>
    <div class="numberPad">
        <div class="output-wrapper">
            <FormItem placeholder="请输入备注(最多150字)"
                        :value="$store.state.record.notesAndAmount.notes"
                      @update:value="onUpdateNotes"
            >
                <span class="output">{{outputValue}}</span>
            </FormItem>
        </div>
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
  import FormItem from '@/components/FormItem.vue';

  @Component({
    components: {FormItem}
  })
  export default class NumberPad extends Vue {
    outputValue = '0';
    createAt = '';

    onUpdateNotes(value:string) :void{
        this.$store.state.record.notesAndAmount.notes = value
    }

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
      this.$emit('update:notesAndAmount', {notes:this.$store.state.record.notesAndAmount.notes,amount:this.outputValue});
      this.createNewAt();
      this.$emit('update:createAt', this.createAt);
      this.$emit('submit');
      this.outputValue = '0';
    }

    save(): void {
      this.collectData();
      this.$router.back();
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

        > .output-wrapper {
            > .formItem {
                > .output {
                    padding-left: 12px;
                    padding-right: 24px;
                    text-align: center;
                    line-height: 52px;
                    font-size: 24px;
                    color: $color-highLight;
                }
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