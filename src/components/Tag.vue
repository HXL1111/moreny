<template>
    <div class="tagList-wrapper">
        <ol class="tagList">
            <li><span class="tag">衣</span>
                <span class="tagName">衣服</span>
            </li>
            <li><span class="tag">食</span>
                <span class="tagName">食物</span>
            </li>
            <li><span class="tag">住</span>
                <span class="tagName">住宿</span>
            </li>
            <li><span class="tag">行</span>
                <span class="tagName">出行</span>
            </li>
            <li><span class="tag">设置</span>
                <span class="tagName">设置</span>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Tag extends Vue {

  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
.tagList-wrapper{
    flex-grow: 1;
    overflow: auto;
    >.tagList {
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