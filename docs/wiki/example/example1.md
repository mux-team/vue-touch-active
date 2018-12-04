# 默认示例

<common-demo title="默认用法" description="默认用法示例">
  <example-demo1></example-demo1>
  <highlight-code slot="codeText" lang="vue">
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
  </highlight-code>
</common-demo>