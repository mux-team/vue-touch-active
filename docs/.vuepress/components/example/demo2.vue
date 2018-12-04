<template>
    <div class="example-container" id="main">
        <touch-active class="container result" url="http://www.baidu.com">
            <h2>个性化配置</h2>
            <touch-active class="example-link"
                backgroundColor="rgba(220,20,60,0.1)"
                borderRadius="5"
                :top=-5
                :left=-5
                :right=-5
                :bottom=-5
                url="http://www.163.com">
                <div>点击此div跳转到http://www.163.com</div>
            </touch-active>
        </touch-active>
    </div>
</template>
<script>
// import {ResponsiveLink, TouchActive, TouchStop} from '../../../../src/index';

export default {
    // components: {
    //     TouchActive,
    //     TouchStop
    // },
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


</style>