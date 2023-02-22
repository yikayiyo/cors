<template>
  <section class="mb-2 text-center">
    <h1 class="text-3xl">CORS - IMAGE</h1>
      <img
        class="border min-w-[100px] bg-slate-400 min-h-[100px] w-full max-w-[750px] h-auto"
        :src="imgSrc"
        alt=""
      />
      <button
        @click="downloadImg('test')"
        class="btn btn-sm mt-2"
      >
        DOWNLOAD IMAGE
      </button>
  </section>
</template>
<script setup>
import {ref} from "vue";
// Image
const imgSrc = ref("https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF");
// todo
const getImageDataURL = (image) => {
  // 创建画布
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  // 以图片为背景剪裁画布
  ctx.drawImage(image, 0, 0, image.width, image.height);
  // 获取图片后缀名
  const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  // 某些图片 url 可能没有后缀名，默认是 png
  return canvas.toDataURL('image/' + extension, 1);
}
const downloadImg = (downloadName) => {
  const tag = document.createElement('a');
  tag.setAttribute('download', downloadName);
  const image = new Image();
  // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
  image.src = imgSrc.value + '?time=' + new Date().getTime();
  //重要，设置 crossOrigin 属性，否则图片跨域会报错
  // image.setAttribute('crossOrigin', 'Anonymous');
  image.setAttribute('crossOrigin', '');  // 同上
  // 图片未加载完成时操作会报错
  image.onload = () => {
    console.log("-0-:", image);
    tag.href = getImageDataURL(image);
    tag.click();
  };
}
</script>
<style lang="">
  
</style>