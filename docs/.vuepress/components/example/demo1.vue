<template>
    <div class="example-container" id="main">
        <div class="container">
            <h2>实例方法（默认已开启）</h2>
            <div class="example-action">
                <div>通过设置rs.stop()关闭点击态</div>
                <touch-active @clickLink="rsStop" class="example-button">点击关闭</touch-active>
                <div>通过设置rs.start()开启点击态</div>
                <touch-active @clickLink="rsStart" class="example-button">点击开启</touch-active>
                <div>通过设置rs.destroy()销毁点击态</div>
                <touch-active @clickLink="rsDestroy" class="example-button">点击销毁</touch-active>
            </div>
        </div>

        <touch-active class="container" url="http://www.baidu.com">
            <h2>默认使用方法</h2>
            <div class="example-title">通过设置组件传入的props的url属性为http://www.baidu.com</div>
            <touch-active class="example-link"
                url="http://www.163.com">
                <div>点击此div触发跳转到http://www.163.com</div>
            </touch-active>
            <div class="example-title">不设置组件的url属性，则默认为button类型</div>
            <touch-active class="example-button">
                <div>button 类型</div>
            </touch-active>
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