<script setup>
import { computed, reactive, onMounted } from "vue";
import httpRequest from "@/utils/httpRequest";

// POST
const admin = reactive({
  name: "",
  age: "",
});
const form = reactive({
  name: "",
  age: "",
});
const adminInfo = computed(() => {
  return `${admin.name} ${admin.age}`;
});
const handlePost = () => {
  httpRequest({
    url: "/a-form-to",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
        resetForm();
      } else {
        console.log("post admin info failed, ", res);
      }
    })
    .catch(function (err) {
      console.error("get admin info failed, ", err);
    });
};

const resetForm = () => {
  form.name = "";
  form.age = "";
}

onMounted(() => {
  httpRequest({
    url: "/admin-data",
    method: "get",
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
    <section class="mb-2 text-center">
      <h1 class="text-3xl">CORS - HTTP request</h1>
      <h2 class="text-2xl mt-4">Admin info</h2>
      <p class="p-4 border border-black mt-4">{{ adminInfo }}</p>
      <div class="form-control mt-4">
        <label class="input-group justify-center">
          <span>Name</span>
          <input
            v-model="form.name"
            type="text"
            class="input input-bordered input-sm"
          />
        </label>
      </div>
      <div class="form-control mt-4">
        <label class="input-group justify-center">
          <span>Age</span>
          <input
            v-model="form.age"
            type="text"
            class="input input-bordered input-sm"
          />
        </label>
      </div>
      <h2 class="text-2xl mt-4">A "simple" request</h2>
      <button
        class="btn btn-sm mt-4"
        @click="handlePost"
      >
        POST /a-form-to
      </button>
    </section>
</template>
