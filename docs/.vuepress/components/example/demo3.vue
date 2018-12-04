<template>
    <div class="example-container" id="main">
        <touch-active class="container">
            <h2>外层点击态</h2>
            <touch-stop class="stop">
                <div>阻止外层点击态</div>
                <touch-active class="example-block" url="http://www.baidu.com">点击此div触发跳转到http://www.baidu.com</touch-active>
            </touch-stop>
        </touch-active>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rs: {}
        }
    },
    mounted() {
        const ResponsiveLink = this.ResponsiveLink;
        this.rs = new ResponsiveLink({
            $root: '#main'
        });
        this.rs.start();
    },
    methods: {
        rsStop() {
            this.rs.stop();
        },
        rsStart() {
            this.rs.start();
        },
        rsDestroy() {
            this.rs.destroy();
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../../../example/src/css/common';

h2
    font-size 16px
    font-weight 700
    margin-bottom 10px

.example-container
    padding 0
    line-height 24px

.container
    margin-bottom 20px
    padding 10px
    background #fff

    a
        display inline-block
        padding 5px 15px
        background #f5f5f5
        border-radius 3px
        margin 5px

    .example-title
        margin-bottom 10px

    .example-link
        padding 5px 15px
        margin-bottom 10px
        display inline-block
        background-color #f5f5f5

    .example-button
        padding 3px 5px
        margin-bottom 10px
        display inline-block
        background-color #f5f5f5

    .stop
        background-color rgba(255,0,0,0.1)
        padding 5px

    .example-block
        padding 10px
        background-color rgba(0,0,0,0.05)


</style>