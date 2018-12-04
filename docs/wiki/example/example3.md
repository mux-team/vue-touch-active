# 局部禁用

<common-demo title="默认用法" description="默认用法示例">
  <example-demo3></example-demo3>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <touch-active class="container">
            <h2>外层点击态</h2>
            <div>通过引入touchStop组件，阻止某块区域点击会触发父级跳转的问题</div>
            <touch-stop class="stop">
                <div>阻止外层点击态</div>
                <touch-active class="block" url="http://www.baidu.com">点击此div触发跳转到http://www.baidu.com</touch-active>
                <touch-active class="example-button">button</touch-active>
            </touch-stop>
        </touch-active>
    </template>
  </highlight-code>
</common-demo>