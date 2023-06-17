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

| 属性名 | 说明       | 类型          | 默认值 |
| ------ | ---------- | ------------- | ------ |
| width  | 设计图宽度 | Number        | 1920   |
| height | 设计图高度 | Number        | 1080   |
| fit    | 适应类型   | fill / w-full | fill   |

### fit 类型

- fill: 充满浏览器全屏，当浏览器宽高比和设计图图宽高比不同时，会出现变形
- w-full: 宽度充满浏览器，高度大于或小于浏览器高度
