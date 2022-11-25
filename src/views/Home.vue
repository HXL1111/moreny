<template>
    <Layout>
        <AmountDisplay/>
        <router-link to="/home/money">
            <Button>记一笔</Button>
        </router-link>
        <TagContent/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import AmountDisplay from '@/components/AmountDisplay.vue';
  import Button from '@/components/Button.vue';
  import TagContent from '@/components/TagContent.vue';


  @Component({
    components: {TagContent, Button, AmountDisplay, Layout}
  })
  export default class Home extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>