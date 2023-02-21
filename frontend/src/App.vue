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

// Preflight
const sendPreflight = () => {
  httpRequest({
    url: "/a-form-to",
    method: "post",
    headers: {
      "X-is-legao": "yes",
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

<template>
  <div class="main-container min-h-screen bg-slate-200 pb-20">
    <section class="mb-2">
      <h1 class="text-3xl">CORS - HTTP request</h1>
      <h2 class="text-2xl">A "simple" request</h2>
      <button
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
        @click="handleGet"
      >
        GET /public-data
      </button>
      <p
        class="border border-black p-10 mt-2"
        v-html="content"
      ></p>
    </section>
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
        @click="handlePost"
      >
        POST /a-form-to
      </button>
    </section>
    <section class="mt-2">
      <p class="text-2xl">A "not simple" request</p>
      <button
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
        @click="sendPreflight"
      >
        POST /a-form-to with x-headers
      </button>
      <button
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
        @click="putPreflight"
      >
        PUT /a-form-to
      </button>
    </section>
    <section class="mt-2">
      <h1 class="text-3xl">CORS - IMAGE</h1>
      <img
        class="border min-w-[100px] bg-slate-400 min-h-[100px] w-full max-w-[750px] h-auto"
        :src="imgSrc"
        alt=""
      />
      <button
        @click="downloadImg('test')"
        class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]"
      >
        DOWNLOAD IMAGE
      </button>
    </section>
    <!-- <section class="mt-2">
      <h1 class="text-3xl">CORS - IFRAME</h1>
      <iframe
        src="https://gzfe.xinhuaskl.com/kt/"
        width="100%"
        frameborder="0"
        style="height: 700px; will-change: transform"
      ></iframe>
      <button class="btn btn-sm mt-2 relative left-[50%] -translate-x-[50%]">
        INSPECT IFRAME
      </button>
    </section> -->
  </div>
</template>
