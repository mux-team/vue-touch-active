<template>
    <div id="index">
        <div class="main">
            <h1>vue-touch-active</h1>
            <h2>点击态</h2>
            <p>一款基于 Vue.js 的点击态组件</p>
            <div class="opt-wrapper">
                <router-link :to="{path: '/wiki/'}" class="card-btn">开始</router-link>
                <a href="https://github.com/mux-team/mux-solution" class="card-btn white">github</a>
            </div>
            <div class="feature">
                <ul>
                    <li>支持两种类型的点击态：链接和button</li>
                    <li>支持自定义点击态背景色的区域位置，颜色，圆角等信息</li>
                </ul>
            </div>
        </div>
        <footer>MIT Licensed | Copyright ©2018 MUX</footer>
    </div>
</template>

<script>

export default {
}
</script>

<style lang="stylus" scoped>
$accentColor = #38f
$borderColor = #eaecef

#index
    background-color #fafafa
    overflow hidden
    min-height 600px

    .main
        max-width 500px
        margin 0 auto
        text-align center

    .example
        text-align center
        width 275px

    h1
        font-size 42px
        font-weight 400
        color #32495f
        margin 50px auto 30px
        text-align center

    h2
        font-size 20px
        color #6889a9
        border none
        margin 20px 0 0

    p
        font-size 12px
        color #6889a9
        margin 0

    .opt-wrapper
        margin 40px 0

    .card-btn
        color #fff
        background linear-gradient(30deg,#3f5b77,#51779b)
        padding 16px 48px
        font-size 20px
        border none
        cursor pointer
        line-height 24px
        margin-right 10px

        &.white
            background #fff
            color #32495f

    .feature
        line-height 32px
        text-align left
        margin-top 60px

    footer
        margin 0 auto 40px
        text-align center
        color #999



</style>
