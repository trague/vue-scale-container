# vue-scale-container

支持 vue3 和 vue2 的大屏自适应缩放组件

- 仓库地址：[github](https://github.com/trague/vue-scale-container)

### 安装

```bash
npm install vue-scale-container
```

### 使用

```vue
<template>
  <VueScaleContainer fit="w-full">
    <div></div>
  </VueScaleContainer>
</template>
<script setup>
import VueScaleContainer from 'vue-scale-container'
</script>
```

### Props

| 属性名              | 说明                                 | 类型          | 默认值 |
| ------------------- | ------------------------------------ | ------------- | ------ |
| width               | 设计图宽度                           | Number        | 1920   |
| height              | 设计图高度                           | Number        | 1080   |
| minHeight           | 代码自适应最小支持高度, 0 则忽略     | Number        | 0      |
| maxHeight           | 代码自适应最大支持高度, 0 则忽略     | Number        | 0      |
| fit                 | 适应类型                             | fill / w-full | fill   |
| forceUpdateOnResize | 是否在 resize 事件强制重新渲染子元素 | Boolean       | false  |

### minHeight、maxHeight

设置 minHeight 和 maxHeight 是为了在此区间内，尽量保证缩放不变形，

- 浏览器不全屏，高度 930px, 代码在高度上利用百分比和间距，适配 930 的屏幕，在 930-1080 的高度上，不变形

- 浏览器为 16:10 的屏幕，高度 1200px, 代码在高度上利用百分比和间距，适配 1200 的屏幕，在 1080-1200 的高度上，比变形

### fit 类型

- fill: 充满浏览器全屏，当浏览器宽高比和设计图图宽高比不同时，会出现变形
- w-full: 宽度充满浏览器，高度大于或小于浏览器高度
