<script setup>
import { ref, onMounted } from "vue";
import httpRequest from "@/utils/httpRequest";

// GET
const content = ref("");
const handleGet = () => {
  content.value = "";
  httpRequest({
    url: "/public-data", // 1. 直接请求服务器
    // url: "/api/public-data",
  })
    .then((res) => {
      if (res.code === 200) {
        content.value = res.data;
      }
    })
    .catch((err) => {
      console.error("error:", err.message);
      content.value = `<div style="color:blue; font-size: 32px;">${err.message}</div>`;
    });
};
onMounted(() => {
  httpRequest({
    url: "/public-data",
    method: "get",
  })
    .then(function (res) {
      if (res.code == 200) {
        console.log("get public data info successed, ", res);
        content.value = res.data;
      }
    })
    .catch(function (err) {
      console.error("get public data info failed, ", err);
    });
});
</script>

<template>
  <div class="main-container min-h-screen bg-slate-200 pb-20">
    <section class="mb-2 text-center">
      <h1 class="text-3xl">CORS - HTTP request</h1>
      <h2 class="text-2xl mt-4">A "simple" request</h2>
      <button
        class="btn btn-sm mt-4"
        @click="handleGet"
      >
        GET /public-data
      </button>
      <p
        class="border border-black p-10 mt-4"
        v-html="content"
      ></p>
    </section>
  </div>
</template>
