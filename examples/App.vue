<script setup lang="ts">
import VueScaleContainer from '../packages/vue-scale-container/src/main'
import TestForceUpdate from './TestForceUpdate.vue'
</script>

<template>
  <VueScaleContainer fit="w-full" :min-height="920" :max-height="1200" force-update-on-resize>
    <div class="wrap">
      <div class="left">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="center"><TestForceUpdate></TestForceUpdate></div>
      <div class="right">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </VueScaleContainer>
</template>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

.wrap {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: #061330;
  height: 100%;
}

.left,
.right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

.left > div,
.right > div {
  /* 设置成正方形，方便查看是否变形 */
  height: 300px;
  border: 1px solid #eee;
}

.center {
  flex: 1;
  margin: 0 30px;
  border: 1px solid #eee;
}
</style>
