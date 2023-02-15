<script setup>
import { computed, ref, reactive, onMounted } from "vue";
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
    type: "get",
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

// POST
const admin = reactive({
  name: "Not exsit",
  age: "0",
});
const form = reactive({
  name: "",
  age: "",
});
const adminInfo = computed(() => {
  return `Admin Info: ${admin.name} + ${admin.age}`;
});
const handlePost = () => {
  httpRequest({
    url: "/a-form-to",
    method: "post",
    data: {
      name: form.name,
      age: form.age,
    },
  })
    .then(function (res) {
      if (res.code == 200) {
        console.log("post admin info successed, ", res);
        admin.name = res.data.name;
        admin.age = res.data.age;
      } else {
        console.log("post admin info failed, ", res);
      }
    })
    .catch(function (err) {
      console.error("get admin info failed, ", err);
    });
};

onMounted(() => {
  httpRequest({
    url: "/",
    type: "get",
  })
    .then(function (res) {
      if (res.code == 200) {
        console.log("get admin info successed, ", res);
        admin.name = res.data.name;
        admin.age = res.data.age;
      }
    })
    .catch(function (err) {
      console.error("get admin info failed, ", err);
    });
});
</script>

<template>
  <div>
    <button @click="handleGet">GET /public-data</button>
    <p v-html="content"></p>
    <div>{{ adminInfo }}</div>
    <div class="row">
      <label for="name">Name: </label>
      <input
        type="text"
        id="name"
        v-model="form.name"
      />
    </div>
    <div class="row">
      <label for="name">Age: </label>
      <input
        type="text"
        id="age"
        v-model="form.age"
      />
    </div>
    <button @click="handlePost">POST /a-form-to</button>
  </div>
</template>
