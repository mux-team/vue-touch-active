# 个性化配置

<common-demo title="个性化配置" description="通过props传入backgroundColor设置点击态背景色，通过top、left、right、bottom设置背景色位置，通过borderRadius设置背景色圆角大小">
  <example-demo2></example-demo2>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <touch-active class="container result" url="http://www.baidu.com">
            <h2>常用配置</h2>
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