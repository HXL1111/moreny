<template>
    <div class="money">
        <Type @update:value="onUpdateType"/>
        <Tags @update:value="onUpdateTags"/>
        <NumberPad @update:notesAndAmount="onUpdateNotesAndAmount"
                   @submit="onSaveRecord"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Tags.vue';
  import NumberPad from '@/components/NumberPad.vue';
  import Type from '@/components/Type.vue';
  import FormItem from '@/components/FormItem.vue';

  @Component({
    components: {FormItem, Type, NumberPad, Tags}
  })
  export default class Money extends Vue {

    record = this.$store.state.record;

    created(): void {
      this.$store.commit('fetchTags');
      this.$store.commit('fetchRecord');
    }

    onUpdateType(value: string): void {
      this.record.type = value;
    }

    onUpdateTags(value: string[]): void {
      this.record.tag = value;
    }

    onUpdateNotesAndAmount(value: { notes: string, amount: string }): void {
      this.record.notesAndAmount = value;
    }

    onSaveRecord(value: string): void {
      if (!this.record.tag || this.record.tag.length === 0) {
        window.alert('请至少选择一个标签');
      } else {
        this.$store.commit('createRecord', this.record);
        if (value === 'true') {
          this.$router.back();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .money {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>