# 指导

### NPM
推荐使用这种方式引入组件
```sh
npm install mux-vue-touch-active
```

### CDN
您也可以通过引入js文件的方式来使用
```html
<script src="https://unpkg.com/mux-vue-touch-active@1.0.2/dist/mux-vue-touch-active.js"></script>
```

### 下载
<a href="https://raw.githubusercontent.com/mux-team/vue-image-viewer/master/dist/mux-vue-image-viewer.js">download</a>

### 引入
您可以以组件的形式引入
``` html
<template>
    <div id="root">
        <touch-active></touch-active>
    </div>
</template>

<script>
import {ResponsiveLink, TouchActive, TouchStop} from 'mux-vue-touch-active';

export default {
  components: {
    TouchActive,
    TouchStop
  },
  mounted() {
      let rs = new ResponsiveLink({
          $root: '#root'
      });

      rs.start();
  }
};
</script>

```

