<template>
    <div class="example-container" id="main">
        <touch-active class="container">
            <h2>外层点击态</h2>
            <div>通过引入touchStop组件，阻止某块区域点击会触发父级跳转的问题</div>
            <touch-stop class="stop">
                <div>阻止外层点击态</div>
                <touch-active class="block" url="http://www.baidu.com">点击此div触发跳转到http://www.baidu.com</touch-active>
                <touch-active class="example-button">button</touch-active>
            </touch-stop>
        </touch-active>
    </div>
</template>
<script>
import {ResponsiveLink, TouchActive, TouchStop} from '../../../../src/index';

export default {
    components: {
        TouchActive,
        TouchStop
    },
    data() {
        return {
            rs: {}
        }
    },
    mounted() {
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
    min-height 200px

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