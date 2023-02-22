<script setup>
import { reactive } from "vue";
import httpRequest from "@/utils/httpRequest";

const admin = reactive({
  name: "",
  age: "",
});

const form = reactive({
  name: "",
  age: "",
});

// put preflight
const putPreflight = () => {
  httpRequest({
    url: "/a-form-to",
    method: "put",
    data: {
      name: form.name,
      age: form.age
    }
  })
    .then(function (res) {
      console.log("put preflight: ", res);
      if(res.code == 200) {
        admin.name = res.data.name;
        admin.age = res.data.age;
        resetForm();
      }
    })
    .catch(function (err) {
      console.error("put preflight:", err);
    });
}

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
    </section>
    <section class="mt-2">
      <p class="text-2xl">A "not simple" request</p>
      <button
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
        @click="putPreflight"
      >
        PUT /a-form-to
      </button>
    </section>
  </div>
</template>