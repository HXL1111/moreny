<template>
    <div>
        <div class="navBar">
            <Icon class="leftIcon" name="left" />
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
            <label>
                <input type="text">
            </label>
        <div class="button-wrapper">
            <Button >删除标签</Button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';


  @Component
  export default class EditLabel extends Vue {
    get tagList() :string[]{
      return this.$store.state.tagList;
    }

    created(): void {
      const name = this.$route.params.tag;
      this.$store.commit('fetchTags');
      const tag = this.tagList.filter((t: string) => t === name)[0];
      if (!tag) {
        this.$router.push('/404');
      } else {
        console.log(tag);
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>