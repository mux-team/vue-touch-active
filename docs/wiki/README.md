# 指导

### NPM
推荐使用这种方式引入组件
```sh
npm install mux-vue-touch-active
```

### CDN
您也可以通过引入js文件的方式来使用
```html
<script src="https://unpkg.com/mux-vue-touch-active@1.0.3/dist/mux-vue-touch-active.js"></script>
```

### 下载
<a href="https://raw.githubusercontent.com/mux-team/vue-image-viewer/master/dist/mux-vue-image-viewer.js">download</a>

### 引入
在入口js文件中引入文件，并注册使用
``` js
// 引入点击态组件
import {TouchActive, TouchStop, ResponsiveLink} from 'mux-vue-touch-active';

// 安装touchActive组件
Vue.use(TouchActive);

// 安装touchStop组件
Vue.use(TouchStop);

// 挂载ResponsiveLink到vue的prototype上，以便使用
Vue.prototype.ResponsiveLink = ResponsiveLink;
```

然后页面中新建`ResponsiveLink`实例，此文件注册点击事件和针对滚动时的一些兼容处理。（如果是单页面，则只需要主页面注册即可，其余页面不用），`touch-active`与 `touch-stop`组件可以直接使用

```html
<template>
    <div id="root">
        <touch-active></touch-active>
    </div>
</template>

<script>
export default {
  mounted() {
      const ResponsiveLink = this.ResponsiveLink;

      let rs = new ResponsiveLink({
          $root: '#root'
      });

      rs.start();
  }
};
</script>

```

