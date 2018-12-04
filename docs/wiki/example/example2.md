# 个性化配置

<common-demo title="默认用法" description="默认用法示例">
  <example-demo2></example-demo2>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <touch-active class="container result" url="http://www.baidu.com">
            <h2>常用配置</h2>
            <div>通过设置组件传入的props的backgroundColor属性、borderRadius、top、left、right、bottom个性化设置点击态效果</div>
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
    </template>
  </highlight-code>
</common-demo>