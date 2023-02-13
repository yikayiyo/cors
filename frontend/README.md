# CORS —— 前端DEMO

基于 vite + vue3 的一个 SPA

默认运行在 5173 端口

安装依赖并运行

```shell
npm install && npm run dev
```

测试1: 直接请求服务器

预期结果： 提示 CORS 错误

测试2: 后端配置CORS

预期结果：成功返回

测试3: 取消测试2中设置的CORS（要重启服务器），前端设置代理转发请求到 3010 端口

预期结果：成功返回

