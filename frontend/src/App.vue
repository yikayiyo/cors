
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (tabName) => {
  return route.path == tabName;
}
</script>
<template>
  <div class="main-container min-h-screen bg-slate-200 pb-20">
    <ul class="w-full overflow-scroll whitespace-nowrap tabs justify-between flex-nowrap p-4">
      <li class="tab  tab-lifted" :class="isActive('/simple-get')? 'tab-active': ''"><router-link to="/simple-get">"Simple" Get</router-link></li>
      <li class="tab  tab-lifted" :class="isActive('/simple-post')? 'tab-active': ''"><router-link to="/simple-post">"Simple" Post</router-link></li>
      <li class="tab  tab-lifted" :class="isActive('/preflight-w-x')? 'tab-active': ''"><router-link to="/preflight-w-x">/preflight-w-x</router-link></li>
      <li class="tab  tab-lifted" :class="isActive('/preflight-put')? 'tab-active': ''"><router-link to="/preflight-put">/preflight-put</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
