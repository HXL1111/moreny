<template>
    <div class="money">
       <Type/>
        <Tag :tags.sync="tags"/>
        <NumberPad/>
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
    tags = ['衣服','食','住','行']

    recordList = [{id: '1' , tag: '衣', type: '-', money: '100'}]

  }
</script>

<style lang="scss" scoped>
    .money{
        height: 100vh;
        display:flex;
        flex-direction: column;
    }
</style>