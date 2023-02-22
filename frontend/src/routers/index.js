import { createRouter, createWebHashHistory } from "vue-router";
import SimpleGet from "@/views/SimpleGet.vue";
import SimplePost from "@/views/SimplePost.vue";
import PreflightWithXHeader from "@/views/PreflightWithXHeader.vue";
import PreflightPut from "@/views/PreflightPut.vue";
import IframeDemo from "@/views/IframeDemo.vue";
import ImageDemo from "@/views/ImageDemo.vue";

const routes = [
  { path: "/", redirect: "/simple-get" },
  { path: "/simple-get", name: "simple-get", component: SimpleGet },
  { path: "/simple-post", name: "simple-post", component: SimplePost },
  { path: "/preflight-w-x", name: "pre-w-xheader", component: PreflightWithXHeader },
  { path: "/preflight-put", name: "pre-put", component: PreflightPut },
  { path: "/cors-iframe", name: "cors-iframe", component: IframeDemo },
  { path: "/cors-img", name: "cors-img", component: ImageDemo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
