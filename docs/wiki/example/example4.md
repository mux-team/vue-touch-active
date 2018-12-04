# 单页面配合路由使用

因为内部嵌有的`router-link`带有跳转功能，因此组件上不需要设置`url`，但是要设置`isJump`来表明是跳转类型
```html
<template>
    <div class="example-container" id="main">
        <touch-active isJump>
            <router-link to="/xxx/xx"></router-link>
        </touch-active>
    </div>
</template>
```