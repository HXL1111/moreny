<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/style/reset.scss";
    @import "~@/assets/style/helper.scss";

    body {
        font-family: $font-hei;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #c6c6c6;
        min-height: 100%;
        ::-webkit-scrollbar { width: 0 !important }
    }

    #app {
        max-width: 500px;
        margin: 0 auto;
        background: #0F0F0F;
    }
</style>
