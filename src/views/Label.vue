<template>
    <div class="tags">
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span>标签管理</span>
            <span class="rightIcon"></span>
        </div>
        <router-link class="tag-wrapper"
                     :to="`/home/money/label/${tag.id}`"
                     v-for="tag in tags" :key="tag.id">
            <div class="tag">
                <span class="logo">{{tag.name.slice(0,1)}}</span>
                <span class="name">{{tag.name}}</span>
            </div>
            <Icon name="right"/>
        </router-link>

        <div class="createTag-wrapper">
            <Button @click="createTag">新建标签</Button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Icon, Button}
  })
  export default class editLabel extends Vue {

    get tags(): void {
      return this.$store.state.tagList;
    }

    beforeCreate(): void {
      this.$store.commit('fetchTags');
    }

    goBack(): void {
      this.$router.back();
    }

    createTag(): void {
      this.$store.commit('createTag');
    }

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .tags {
        padding: 0 18px;
        color: $color-highLight;
        display: flex;
        flex-direction: column;
        height: 100%;

        .navBar {
            text-align: center;
            font-size: 16px;
            padding: 12px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            > .leftIcon {
                width: 20px;
                height: 20px;
            }

            > .rightIcon {
                width: 20px;
                height: 20px;
            }
        }

        > .tag-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $color-highLight;
            margin: 0 16px;
            padding: 8px 0;
            border-bottom: 1px solid #2f2f2f;

            %font {
                width: 38px;
                height: 38px;
                line-height: 38px;
            }

            > .tag {
                display: flex;

                > .logo {
                    background: #515151;
                    text-align: center;
                    font-size: 15px;
                    @extend %font;
                    border-radius: 50%;
                }

                > .name {
                    @extend %font;
                    padding-left: $leftPadding;
                }
            }
        }

        .createTag-wrapper {
            text-align: center;
            padding: 14px 0;
        }
    }


</style>