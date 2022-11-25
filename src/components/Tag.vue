<template>
    <div class="tagList-wrapper">
        <ol class="tag-wrapper">
            <li v-for="tag in tagList" :key="tag">
                <span class="tag-wrapper"
                      @click="select(tag)"
                      :class="{selected: selectedTags.indexOf(tag)>=0}">{{tag.slice(0,1)}}
                </span>
                <span class="tagName">{{tag}}</span>
            </li>
            <li>
                <router-link to="/home/money/label" class="tag-wrapper">
                    <Icon name="edit"/>
                </router-link>
                <span class="tagName">编辑</span>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class Tag extends Vue {
    @Prop() tagList: string[] | undefined;
    selectedTags: string[] = [];

    created() :void{
      if (this.tagList) {
        this.selectedTags = [this.tagList[0]];
      }
      this.$emit('update:value', this.selectedTags);
    }

    select(tag: string): void {
      this.selectedTags = [];
      this.selectedTags.push(tag);
      this.$emit('update:value', this.selectedTags);
    }
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .tagList-wrapper {
        flex-grow: 1;
        overflow: auto;

        > .tag-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 18px;
            color: $color-highLight;

            > li {
                margin: 14px 0;
                width: 20%;
                height: 40px;
                display: flex;
                flex-direction: column;
                text-align: center;
                line-height: 40px;
                justify-content: center;
                align-items: center;

                > .tag-wrapper {
                    background: #515151;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;

                    &.selected {
                        background: #dddedf;
                        color: black;
                    }
                }

                > .tagName {
                    transform: scale(0.8);
                    font-size: 12px;
                    margin-top: -10px;
                }
            }
        }
    }
</style>