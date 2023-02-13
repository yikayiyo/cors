<script setup>
import { ref } from "vue";
import httpRequest from "@/utils/httpRequest"

const content = ref("");
const handleGet = () => {
  content.value = "";
  httpRequest({
    url: "/public-data" // 1. 直接请求服务器
    // url: "/api/public-data",  
  }).then(res=> {
    if(res.code === 200) {
      content.value = res.data;
    }
  }).catch(err => {
    console.error("error:", err.message);
    content.value = `<div style="color:blue; font-size: 32px;">${err.message}</div>`;
  })
}
</script>

<template>
  <div>
    <button @click="handleGet">GET /public-data</button>
    <p v-html="content"></p>
  </div>
</template>