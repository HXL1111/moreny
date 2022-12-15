<template>
    <div class="wrapper">
            <span @click="showDatePicker" class="date">{{currentDate}}
                <Icon name="down"/>
            </span>
        <Popup v-model="visible" position="top">
            <DatetimePicker v-model="lastTime"
                            type="year-month"
                            title="选择年月"
                            @cancel='hideDatePicker'
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

    now = new Date();
    lastTime = this.now;

    get currentDate(): string {
      return dayjs(this.now).format('YYYY年MM月');
    }

    set currentDate(value: string) {
      this.now = new Date(value);
    }

    visible = false;

    showDatePicker(): void {
      this.visible = true;
    }

    hideDatePicker(): void {
      this.lastTime = this.now;
      this.visible = false;
    }

    setDate(date: Date): void {
      this.now = date;
      this.lastTime = this.now;
      this.hideDatePicker();
      this.$emit('update:value', this.now);
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 16px 0;
        background: #0f0f0f;

        > .date {
            padding-left: 16px;
        }
    }
</style>