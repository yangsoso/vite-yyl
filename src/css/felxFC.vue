<script setup>

</script>

<template>
    <div class="outer_box">
    <div class="aside">aa</div>
    <div class="container">南玖</div>
</template>
    
<style>
/* 使用calc 实现自适应 */
.outer_box {
    width:100%;
} 
.aside {
    float: left;
    width:180px;
    height: 300px;
    background:lightpink;
}
.container{
    width:calc(100% - 180px);
    height:400px;
    background:mediumturquoise;
    overflow: hidden;
}

/* 使用felx 实现 */
.outer_box {
  display:flex;
	width:100%;
} 
.aside {
  float: left;
  width:180px;
  height: 300px;
  background:lightpink;
}
.container{
  flex: 1;
  height:400px;
  background:mediumturquoise;
  overflow: hidden;
 }
</style>

