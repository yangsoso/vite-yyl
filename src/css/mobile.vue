
<script setup>

</script>

<template>
<!-- 项目怎么做的移动端适配？flexible原理（1px问题，通过viewport）
    retina 屏的 1px 线会显得比较粗，设计美感欠缺；在视觉设计师眼里的 1px 是指设备像素 1px，而如果我们直接写 css 的大小 1px，那在 dpr = 2 时，则等于 2px 设备像素，dpr = 3 时，等于 3px 设备像素。所以对于要求处理 1px 的场景，我们要进行特殊处理。
    以下介绍常用的几种方法：
    1. transform: scale(0.5) 实现复杂场景比较复杂，会影响子元素
    2. transform: scale(0.5) + :before / :after  比较通用
 -->
    <div class="class1">transform: scale(0.5)</div>
    <div class="class2">transform: scale(0.5) + :before / :after （推荐）</div>
</template>
    
<style>
/* 使用calc 实现自适应 */
.class1 {
  height: 1px; 
  transform: scaleY(0.5);
}

.class2 {
  position: relative;
  &::after {
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-top:1px solid #666;
    transform: scaleY(0.5);
  }
}

</style>

