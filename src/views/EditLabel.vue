<template>
    <div class="editLabel">
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="formItem-wrapper">
            <span class="tagName">标签名</span>
            <FormItem :value="currentTag.name"
                      @update:value="update"
                      placeholder="请输入标签名"/>
        </div>
        <Button @click="remove">删除标签</Button>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get tagList(): string[] {
      return this.$store.state.tagList;
    }

    // eslint-disable-next-line no-undef
    get currentTag(): Tag {
      return this.$store.state.currentTag;
    }

    created(): void {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if (!id) {
        this.$router.push('/404');
      }
    }

    update(name: string): void {
      this.$store.commit('updateTag', {id: this.currentTag.id, name});
      this.goBack()
    }

    remove(): void {
      this.$store.commit('removeTag', this.currentTag);
    }

    goBack(): void {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .editLabel {
        color: $color-highLight;
        height: 100vh;

        .navBar {
            text-align: center;
            font-size: 16px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;


            > .title {

            }

            > .leftIcon {
                width: 20px;
                height: 20px;
            }

            > .rightIcon {
                width: 20px;
                height: 20px;
            }
        }

        .formItem-wrapper {
            display: flex;
            margin-top: 8px;

            > .tagName {
                text-align: center;
                line-height: 52px;
                padding: 0 18px;
            }


        }

    }


</style>