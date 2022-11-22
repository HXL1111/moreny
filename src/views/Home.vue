<template>
    <Layout>
        <AmountDisplay/>
        <Button/>
        <TagList/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import AmountDisplay from '@/components/AmountDisplay.vue';
  import Button from '@/components/Button.vue';
  import Content from '@/components/TagContent.vue';
  import TagList from '@/components/TagContent.vue';

  @Component({
    components: {TagList, Content, Button, AmountDisplay, Layout}
  })
  export default class Home extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>