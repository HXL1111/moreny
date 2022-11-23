<template>
    <div class="money">
        <Type @update:value="onUpdateType"/>
        <Tag :tags="tags" @update:value="onUpdateTags"/>
        <NumberPad @update:notes="onUpdateNotes"
                   @update:amount="onUpdateAmount"
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


  @Component({
    components: {Type, NumberPad, Tag}
  })
  export default class Money extends Vue {
    get tags(): void {
      return this.$store.state.tagList;
    }

    // eslint-disable-next-line no-undef
    recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    ;
    // eslint-disable-next-line no-undef
    record: RecordItem = {
      tag: [], type: '-', notes: '', amount: '0', createAt: ''
    };


    created(): void {
      this.$store.commit('fetchTags');
    }


    onUpdateType(value: string): void {
      this.record.type = value;

    }

    onUpdateTags(value: string[]): void {
      this.record.tag = value;
    }

    onUpdateNotes(value: string): void {
      this.record.notes = value;
    }

    onUpdateAmount(value: string): void {
      this.record.amount = value;
    }

    onUpdateCreateAt(value: string): void {
      this.record.createAt = value;
    }

    clone<T>(data: T): T {
      return JSON.parse(JSON.stringify(data));
    }

    onSaveRecord(): void {
      const record2 = this.clone(this.record);
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