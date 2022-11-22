<template>
    <div class="money">
       <Type/>
        <Tag/>
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

  }
</script>

<style lang="scss" scoped>
    .money{
        height: 100vh;
        display:flex;
        flex-direction: column;
    }
</style>