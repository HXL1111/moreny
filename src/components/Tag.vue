<template>
    <div class="tagList-wrapper">
        <ol class="tagList">
            <li v-for="tag in tagList" :key="tag">
                <span class="tag" :class="{}">{{tag.slice(0,1)}}</span>
                <span class="tagName">{{tag}}</span>
            </li>
            <li>
                <span class="tag" @click="createTag"><Icon name="add"/></span>
                <span class="tagName">新增</span>
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

    createTag(): void {
      const name = window.prompt('请输入标签名');
      if (!name) {
        window.alert('标签名不能为空');
      } else {
        if (this.tagList) {
          if (this.tagList.indexOf(name) >= 0) {
            window.alert('标签名已存在')
          } else {
            this.tagList.push(name);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .tagList-wrapper {
        flex-grow: 1;
        overflow: auto;

        > .tagList {
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

                > .tag {
                    background: #515151;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
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