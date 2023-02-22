<script setup>
import {ref} from "vue";

const embed = ref("");

const getTextInIframe = () => {
  const iframe = document.getElementById("iframe");
  console.log(iframe.contentDocument);
  try {
    const dom = iframe.contentDocument.getElementsByTagName('h1')[0];
    embed.value = dom.innerText;
    iframe.contentDocument.body.classList.add("text-white");
  } catch(e) {
    embed.value = e.message;
  }
}
</script>
<template lang="">
  <section class="text-center">
      <h1 class="text-3xl mt-4">CORS - IFRAME</h1>
      <a class="link link-primary" href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentDocument">说明</a>
      <iframe
        id="iframe"
        src="https://gzfe.xinhuaskl.com/kt/"
        width="100%"
        frameborder="0"
        style="height: 700px; will-change: transform"
      ></iframe>
      <!-- <iframe
        id="iframe"
        src="http://localhost:5173/simple-get"
        width="100%"
        frameborder="0"
      ></iframe> -->
      <p v-html="embed" class="p-10 mt-4 border border-zinc-500"></p>
      <button class="btn btn-sm mt-4" @click="getTextInIframe">
        OP IFRAME
      </button>
  </section>
</template>