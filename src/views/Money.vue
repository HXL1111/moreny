<template>
    <div class="money">
        {{record}}
        <Type @update:value="onUpdateType"/>
        <Tag :tags="tagList" @update:value="onUpdateTags"/>
        <NumberPad @update:notesAndAmount="onUpdateNotesAndAmount"

                   @update:createAt="onUpdateCreateAt"
                   @submit="onSaveRecord"
        />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tag from '@/components/Tag.vue';
  import NumberPad from '@/components/NumberPad.vue';
  import Type from '@/components/Type.vue';
  import FormItem from '@/components/FormItem.vue';
  import clone from '@/lib/clone';
  type RecordItem = {
    tag: string[]
    type: string
    notesAndAmount: { notes:string,amount:string }
    createAt?: string
  }

  @Component({
    components: {FormItem, Type, NumberPad, Tag}
  })
  export default class Money extends Vue {
    get tagList(): void {
      return this.$store.state.tagList;
    }
    get record(): void{
      return  this.$store.state.record
    }


    recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

    created(): void {
      this.$store.commit('fetchTags');
      console.log(this.record)
    }

    onUpdateType(value: string): void {
      this.$store.state.record.type = value;
    }

    onUpdateTags(value: string[]): void {
      this.$store.state.record.tag = value;
    }


    onUpdateNotesAndAmount(value: {notes: string, amount:string}): void {
      this.$store.state.record.notesAndAmount = value;
    }

    onUpdateCreateAt(value: string): void {
      this.$store.state.record.createAt = value;
    }

    onSaveRecord(): void {
      const record2 = clone(this.$store.state.record);
      this.recordList.push(record2);
      console.log(this.recordList);
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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