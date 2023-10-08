<script setup lang="ts">
import { onMounted, ref } from "vue";
import { elButton } from "../dist/comp-demo.es";

onMounted(() => {
  console.log("tButton :>> ", elButton);
});
</script>

<template>
  <div class="wrap">
    <elButton />
  </div>
</template>

<style scoped lang="less">
.ol {
  border: 1px solid #fff;
  border-image: linear-gradient(to top, #f80, #2ed);
  border-image-slice: 10;
  box-sizing: border-box;
}
.wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
