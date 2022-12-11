<template>
    <div class="wrapper">
            <span @click="showPopup">{{currentDate}}
                <Icon name="down"/>
            </span>
        <Popup v-model="visible" position="top">
            <DatetimePicker v-model="now"
                            type="year-month"
                            title="选择年月"
                            @cancel="hideDatePicker"
                            @confirm="setDate"
            />
        </Popup>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {DatetimePicker} from 'vant';
  import {Popup} from 'vant';
  import dayjs from 'dayjs';

  @Component({
    components: {
      DatetimePicker, Popup
    }
  })
  export default class DateComponent extends Vue {
    now = new Date()
    get currentDate() :string{
      return dayjs(this.now).format('YYYY年MM月');
    }
    set currentDate(value:string){
        this.now = new Date(value)
    }
    visible = false;
    showPopup(): void {
      this.visible = true;
    }
    hideDatePicker():void{
      this.visible =false
    }
    setDate(date:Date):void{
      this.now = date
      this.hideDatePicker()
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper {
        color: #FFFFFF;
    }
</style>