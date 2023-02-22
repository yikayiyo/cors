<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import httpRequest from "@/utils/httpRequest";

// Preflight
const form = reactive({
  name: "",
  age: ""
})

const admin = reactive({
  name: "",
  age: ""
})

const adminInfo = computed(() => {
  return admin.name + admin.age || "";
})

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
})

const sendPreflight = () => {
  httpRequest({
    url: "/a-form-to-wx",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-is-bill": "yes",
    },
    data: {
      name: form.name,
      age: form.age
    }
  })
    .then(function (res) {
      console.log("preflight: ", res);
      if(res.code == 200) {
        admin.name = res.data.name;
        admin.age = res.data.age;
        resetForm();
      }
    })
    .catch(function (err) {
      console.error("preflight:", err);
    });
};

const resetForm = () => {
  form.age = "";
  form.name = "";
}
</script>

<template>
  <div class="main-container min-h-screen bg-slate-200 pb-20">
    <section class="mb-2">
      <h2 class="text-2xl">Admin info</h2>
      <p class="p-4 border border-black">{{ adminInfo }}</p>
      <div class="form-control mt-2">
        <label class="input-group justify-center">
          <span>Name</span>
          <input
            v-model="form.name"
            type="text"
            class="input input-bordered input-sm"
          />
        </label>
      </div>
      <div class="form-control mt-2">
        <label class="input-group justify-center">
          <span>Age</span>
          <input
            v-model="form.age"
            type="text"
            class="input input-bordered input-sm"
          />
        </label>
      </div>
      <button
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
        @click="sendPreflight"
      >
        POST /a-form-to with x-headers
      </button>
    </section>
  </div>
</template>
